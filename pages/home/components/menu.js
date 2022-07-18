import { List, ThemeIcon, Avatar, TextInput } from '@mantine/core';
import { CircleCheck, CircleDashed } from 'tabler-icons-react';
import { useState, useEffect } from 'react';
import { api } from '../../api/api';

 export default function Menubar({handleClick}){

      const [pendentes, setPendentes] = useState([])
      const [query, setQuery] = useState("")


  useEffect(()=>{

    localStorage.setItem('foto','')
    const updateData = async ()=>{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };
    const response = await (await fetch(`http://194.195.86.239:8080/api/pendentes`, requestOptions)).json();
    setPendentes(response)    
    console.log(response)
    }

    updateData();

    setInterval(async ()=>{

      await updateData()

      
      }, 10000)
    
    },[])



    return(
      <>
<TextInput placeholder='Pesquisa' style={{marginBottom:"1em"}} onChange={event => setQuery(event.target.value)}></TextInput>
        <List
        spacing="xs"
        size="sm"
        center
        icon = {<Avatar color="cyan" radius="xl"></Avatar>}
       
      >
        {pendentes.filter(post=>{
          if (query === '') {
            return post;
          } else if (post.cpf.includes(query.toLowerCase())||post.nome.toLowerCase().includes(query.toLowerCase())) {
            return post;
          }
        }).map((element)=>{

          return <List.Item 
          icon = {<Avatar color="cyan" src={element.foto!=null?`http://194.195.86.239:8080/avatar/${element.foto}.jpg`:false} radius="xl"></Avatar>}
          key={element.id} onClick={()=>{handleClick(element)}} style={{cursor:'pointer'}}>{element.nome}</List.Item>

        })}
          
      </List>
      </>
)



}