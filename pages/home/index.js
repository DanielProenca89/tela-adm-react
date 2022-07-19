import Menubar from './components/menu';
import React, { useEffect, useState } from 'react';
import Formulario from './components/form';
import Formulario2 from './components/form2';
import {Router, useRouter} from 'next/router'
import WebcamCapture from './components/camera';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Image,
  Text,
  MediaQuery,
  Center,
  Burger,
  useMantineTheme,
  Modal
} from '@mantine/core';
import { getGrupo, isLogged } from '../api/auth';





function App() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [userData, setUserdata] = useState({});
    const [openedweb, setOpenedWeb] = useState(false);
    const [openedfoto, setOpenedPhoto] = useState(false);
    const [grupo, setGrupo] = useState("");
    const [foto, setFoto] = useState("");
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    
    useEffect(()=>{
        const handleStart = (url) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url) => (url === router.asPath) && setLoading(false);
  
        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)
  
        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
      })


useEffect(()=>{
  if(!!window){    
  if(!isLogged()){
      router.push('/');
    
    }else{
      async ()=>{
        if(await getGrupo()){
      setGrupo(await getGrupo())
      setFoto(localStorage.getItem('foto'))
      console.log(grupo)
        }
      }
    }
  }else{
    return false
  }
  })

    async function uploadImage(image, data){

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({foto:image, cpf:data})
    };
    const response = await (await fetch(`http://194.195.86.239:8080/api/uploadimage`, requestOptions)).json();
    localStorage.setItem('image', response) 
   return response;
}
    

    



    const upimage= async (image)=>{

      setOpenedWeb(false)
      setOpenedPhoto(false)
      let data = userData
      data.foto = await uploadImage(image,userData.cpf)
      setUserdata(data)
      localStorage.setItem('foto', data.foto)  
  }
    


    const handleClick = (element)=>{

      setUserdata(element)
  
      localStorage.setItem('foto', element.foto)
      setFoto(element.foto)
      
    }


    

    const OpenCam = ()=>{

      setOpenedWeb(true)

    }

  return (
    <AppShell
    styles={{
      main: {
        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3],
      },
    }}
    navbarOffsetBreakpoint="sm"
    asideOffsetBreakpoint="sm"
    fixed
    navbar={
      <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        <Text weight={"bold"}>Solicitações</Text>
        <Menubar handleClick={handleClick}></Menubar>
      </Navbar>
    }
    

    header={
      <Header height={70} p="md" style={{backgroundColor:'black'}}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          
          </MediaQuery>

          <Text color={'teal'} weight={'bold'} size='lg'>Siga</Text>'   '<Text color={'white'} weight={'bold'} size='lg'>[interno]</Text>
        </div>
      </Header>
    }
  >

{(async()=>{await getGrupo == 2})?<Formulario userData={userData} OpenCam={OpenCam} upimage={upimage}></Formulario>:<Formulario2 userData={userData} OpenCam={OpenCam} upimage={upimage}></Formulario2>}

<Modal
            opened={openedweb}
            onClose={() => setOpenedWeb(false)}
            title={grupo==2?"Tire uma foto":false}
            closeOnClickOutside={false}
            size="lg"
    >
<Center>{(async()=>{await getGrupo == 2})?<WebcamCapture upimage={upimage}/>:<Image width={"60vh"} height={"60vh"} src={`http://194.195.86.239:8080/avatar/${foto}.jpg`} style={{size:'100vh'}}/>}</Center>

      </Modal>

  </AppShell>
    
  );
}

export default App