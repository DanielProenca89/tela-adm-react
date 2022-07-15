import { List, ThemeIcon, Avatar } from '@mantine/core';
import { CircleCheck, CircleDashed } from 'tabler-icons-react';



 export default function Menubar({handleClick}){


    return(

        <List
        spacing="xs"
        size="sm"
        center
        icon = {<Avatar color="cyan" radius="xl"></Avatar>}
        
      >
        <List.Item></List.Item>
        <List.Item></List.Item>
        <List.Item></List.Item>
        <List.Item></List.Item>
        <List.Item
          icon={
            <Avatar color="cyan" radius="xl">MK</Avatar>
          }
        >
          Submit a pull request once you are done
        </List.Item>
      </List>

)



}