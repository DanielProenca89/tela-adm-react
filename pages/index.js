import React, {Component} from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Router from 'next/router'
import { useForm } from '@mantine/form';
import { LoadingOverlay, TextInput, Text, Button, Box, PasswordInput, Center, MantineProvider } from '@mantine/core';
import '../styles/Login.module.css'
import { api } from './api/api';
import {isLogged, setSession} from './api/auth'
import { Login } from 'tabler-icons-react';
import {Md5} from 'ts-md5';
export default function Home() {


  const [error,setError] = useState('');
  const [visible, setVisible] = useState(false);

  const Login = async (values)=>{
    const response = await api({user:values.user, senha:Md5.hashStr(values.password)}, 'login/interno');
    setVisible(true);

    if(JSON.parse(response).response == 1){
      setSession(JSON.parse(response).key);
      setVisible(false)
      Router.push('/home')
    }else{
      setVisible(false)
      setError("Acesso negado")

  }
}
  const form = useForm({
    initialValues: {
      user: '',
      password:''
     
    },
  })


  return (
    <>
   <MantineProvider theme={{ colorScheme: 'light' }}>
         

         <Text
             style={{ lineHeight: 1, fontFamily: 'Greycliff CF, sans-serif', textAlign: 'center', fontSize: '100px', fontWeight: 'bold', color:"#fff" }}
             mt={100}
             class='logo'>
             SIGA
         </Text>
         <p style={{ lineHeight: 1, fontFamily: 'Greycliff CF, sans-serif', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: "none" }}>SISITEMA DE GERENCIAMENTO E ACOMPANHAMENTO</p>

         <Box sx={(theme) => ({
             backgroundColor: "none",
            border: "1px solid",
            borderImage: "linear-gradient(to right bottom, teal, blue)",
            borderImageSlice: 1, 
            padding: theme.spacing.xl,
             borderRadius: theme.radius.md,
             cursor: 'pointer',
             maxWidth: 340,
         })} mx="auto">

             <LoadingOverlay visible={visible} />
             <form  onSubmit={form.onSubmit((values)=>Login(values))}>
              <label style={{color:"#fff"}}>Login</label><div style = {{color:"red", display:"inline"}}> *</div>
                 <TextInput
                 className='login'
                     required
                     style = {{marginTop:"10px", marginBottom:"1em"}}
                     placeholder=""
                     theme="light"
                     {...form.getInputProps('user')}
                   />
                <label style={{color:"#fff"}}>Senha</label><div style = {{color:"red", display:"inline"}}> *</div>
                 <PasswordInput
                     required    
                     placeholder="Senha"
                     mt="sm"
                     style = {{marginTop:"10px"}}
                     {...form.getInputProps('password')}
                   />
                 <Center>
                     <Button type='submit' variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} size="lg" mt="lg">
                         Acessar
                     </Button>

                 </Center>
                 <Center></Center>
             </form>
             <Center><Text style={{ color:'red'}}>{error}</Text></Center>
           
         </Box>
     </MantineProvider>

    </>
  )
}
