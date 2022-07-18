import {Text, TextInput, NumberInput, Avatar, Button, Select} from '@mantine/core'
import { useEffect, useState } from 'react'

export default function Formulario({userData, OpenCam}){
    
    
    const Data  = userData
    const [foto, setFoto] = useState(userData.foto)
    


    useEffect(()=>{

setInterval(()=>{
    if(Data.foto != localStorage.getItem('foto')){
    setFoto("")
    setFoto(localStorage.getItem('foto'))
}
},300)
    },[])

    
    
return(

<form >

<div style={{paddingLeft:'5em', paddingRight:'5em'}}>
<Avatar
      component="a"
      onClick={()=>{OpenCam()}}
      target="_blank"
      src={`http://194.195.86.239:8080/avatar/${foto}.jpg`}
      size='xl'
      style={{cursor:'pointer'}}
      alt={Data.nome}
    />
<Text size='xl'>{Data.nome}</Text>
<Text size='xl' color={"red"}>Ticket #{Data.ticket}</Text>
<div style={{marginTop:'1em'}}>
<TextInput value ={Data.cpf} label="CPF" disabled></TextInput>
<TextInput value ={Data.email} label="E-mail" disabled></TextInput>
<TextInput value ={Data.telefone} label="Telefone" disabled></TextInput>
<TextInput value ={Data.data_solicitada?Data.data_solicitada.split('T')[0]:''} label="Data Solicitada" disabled></TextInput>
<TextInput  label="Permanêcia" type='time'></TextInput>
<Button type='submit' variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} size="sm" mt="lg">
Autorizar
</Button>
</div>
</div>


</form>
)
}