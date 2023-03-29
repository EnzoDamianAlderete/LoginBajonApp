import {
	Box,
	FormControlLabel,
	Radio,
	Button,
	TextField,
	Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { APIInstance } from "../../config/axios"
import { useState } from 'react'

const LoginForm = () => {

	const navigate = useNavigate();
	const [mensaje,setMensaje] = useState();
	const [mensajeCorrect,setMensajeCorrect] = useState();
	const [dataUser , setDataUser] = useState();
	const [inputs ,setInputs ] = useState({
        email:"",
        password:""
    });
	const {email , password} = inputs;

    const HandleChange=(e)=>{
        setInputs({...inputs, [e.target.name]: e.target.value});
		
    }

	const onSubmit = async(e)=>{
        e.preventDefault();
		console.log(inputs);
         if(email ==="" || password ===''){
             setMensaje("Por favor complete todos los campos");
			 console.log("Por favor complete todos los campos");
                  setTimeout(()=>{
                      setMensaje("");
                  },3000);
         } else if(email !=="" || password !==''){
             const User = {
                 email,
                 password
             };
             //setLoading(true);
			 await APIInstance.post('/login',User)
			 .then((res)=>{
				localStorage.setItem("token",res.data?.user.token);
				console.log(res.data);
				setMensajeCorrect('Sesion iniciada correctamente!');
			 	console.log(`Sesion iniciada correctamente! Bienvenido ${res.data.user.name}`);
                  setTimeout(()=>{
					setMensajeCorrect("");
					navigate('/');
                  },3000);

			 }).catch((error)=>{
				setMensaje("Correo u contraseña incorrecta");
			 	console.log("Correo u contraseña incorrecta");
                  setTimeout(()=>{
                      setMensaje("");
                  },3000);
				console.error(error);
			 })
			 
          }
    }


	return (
		<Box onSubmit={(e)=> onSubmit(e)} as='form' bgcolor='white' padding='2em' borderRadius='8px'>
			<TextField
				onChange={(e)=> HandleChange(e)}
				placeholder="Email"
				type="email"
				value={email}
				name="email"
				id="email"
				label='Email'
				variant='outlined'
				margin='normal'
				fullWidth
			/>
			<TextField
				onChange={(e)=> HandleChange(e)}
				name="password"
				value={password}
				id="password"
				type="password"
				label='Contraseña'
				variant='outlined'
				margin='normal'
				fullWidth
				autoComplete='current-password'
			/>
			<FormControlLabel
				value='a'
				name='radio'
				control={<Radio />}
				inputProps={{ 'aria-label': 'A' }}
				label='Mantener conectado'
				labelPlacement='End'
				sx={theme => ({
					color: theme.palette.custom.dark,
				})}
			/>
			<Link href='#' color='purple'>
				Recuperar contraseña
			</Link>
			<Button
				type="submit"
				variant='contained'
				sx={theme => ({
					background: theme.palette.custom.blue,
					'&:hover': { background: theme.palette.custom.blue },
					width: '100%',
					marginY: '1rem',
					fontSize: '1rem',
				})}>
				Iniciar Sesión
			</Button>

			<Box textAlign='center'>
				<Typography as='span' mr='0.5rem'>
					¿No tienes una cuenta?
				</Typography>
				<Link to='/signup'>Regístrate</Link>
			</Box>

			{mensaje && <Box
			bgcolor='red'
			sx={{ color:'white' }}
			padding='1em'
			borderRadius='8px'
			textAlign='center'
			>
				{mensaje}
			</Box>}

			{mensajeCorrect && <Box
			bgcolor='green'
			sx={{ color:'white' }}
			padding='1em'
			borderRadius='8px'
			textAlign='center'
			>
				{mensajeCorrect}
			</Box>}
		</Box>
	)
}

export default LoginForm
