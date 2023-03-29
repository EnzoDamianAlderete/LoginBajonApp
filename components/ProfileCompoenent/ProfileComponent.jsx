import {
    Box,
	Button,
} from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';


const ProfileComponent =()=>{
    const { token , setToken } = useAppContext();
    const [nameUser , setNameUser] = useState();
    const [emailUser , setEmailUser] = useState();

    const sesionClose =()=>{
        localStorage.removeItem("token");
        setToken('');
    }

    useEffect(()=>{
        if(token){
            axios
            .get(`http://localhost:3100/user`,{
                headers:{
                    token: token,
                }
            })
            .then(({data})=>{
                setNameUser(data.name);
                setEmailUser(data.email);
            })
            .catch((error)=> console.error(error));
        }
    })

    return(
    <Box
    sx={{
        display: 'flex',
        color: 'white',
        flexDirection: 'column',
        padding: 2,
        minHeight: '100vh',
    }}>
    <Box>
        <svg
        width="100" height="100" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4ZM4 18c0-2.66 5.33-4 8-4s8 1.34 8 4v2H4v-2Z" clip-rule="evenodd"></path>
        </svg>
    </Box>
    <h2>Bienvenido <span  style={{color:'red', fontSize:"px"}}>{nameUser}</span> de nuevo!</h2>
    <p>Nombre usuario: <span  style={{color:'red', fontSize:"19px"}}>{nameUser}</span></p>
    <p>Email: <span  style={{color:'red', fontSize:"19px"}}>{emailUser}</span></p>
    <Button 
    onClick={sesionClose}
    variant='contained' 
    sx={{ backgroundColor: 'custom.skyBlue', marginTop: "2rem" }}>
        Cerrar Sesión
    </Button>
    </Box>
    )
    
}

export default ProfileComponent;