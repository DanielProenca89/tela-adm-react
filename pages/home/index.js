import Menubar from './components/menu';
import React, { useEffect, useState } from 'react';
import Formulario from './components/form';
import Router from 'next/router';
import WebcamCapture from './components/camera';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Modal
} from '@mantine/core';
import { isLogged } from '../api/auth';





function App() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [userData, setUserdata] = useState({})
    const [openedweb, setOpenedWeb] = useState(false)
    
    useEffect(()=>{
    
      if(!isLogged()){
      Router.push('/');
    
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
      let data = userData
      data.foto = await uploadImage(image,userData.cpf)
      localStorage.setItem('foto', image)
      setUserdata(data)
      localStorage.setItem('foto', data.foto)  
  }
    


    const handleClick = (element)=>{

      setUserdata(element)
      localStorage.setItem('foto', element.foto)  
      

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

          <Text color={'teal'} weight={'bold'} size='lg'>Siga</Text>
        </div>
      </Header>
    }
  >

<Formulario userData={userData} OpenCam={OpenCam} upimage={upimage}></Formulario>

<Modal
            opened={openedweb}
            onClose={() => setOpenedWeb(false)}
            title="Tire uma foto"
            closeOnClickOutside={false}
    >
<WebcamCapture upimage={upimage}/>
      </Modal>

  </AppShell>
    
  );
}

export default App