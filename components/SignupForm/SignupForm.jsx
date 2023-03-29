import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { APIInstance } from "../../config/axios"

const INITIAL_STATE = {
	name: '',
	email: '',
	password: '',
	repassword: '',
}

const SignupForm = () => {

	const navigate = useNavigate();
	const [form, setForm] = useState(INITIAL_STATE)

	const { name, email, password, repassword } = form
	const [mensaje,setMensaje] = useState();
	const [mensajeCorrect,setMensajeCorrect] = useState();

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async(e) => {
		e.preventDefault()
		console.log(form);
         if(name ==="" || email ==="" || password ==='' || repassword ==='' ){
             setMensaje("Por favor complete todos los campos");
			 console.log("Por favor complete todos los campos");
                  setTimeout(()=>{
                      setMensaje("");
                  },3000);
         }else if(password !== repassword ){
			setMensaje("Las contraseñas no coinciden");
			 console.log("Las contraseñas no coinciden");
                  setTimeout(()=>{
                      setMensaje("");
                  },3000);
		 } else if(name !=="" || email !=="" || password !==''|| repassword !==''){
             const User = {
				name,
                email,
                password
             };
             //setLoading(true);
			 await APIInstance.post('/users',User)
			 .then((res)=>{
				const {data}=res;
				console.log(res.data);
				setMensajeCorrect("Usuario creado correctamente!");
			 	console.log("Usuario creado!");
                  setTimeout(()=>{
					setMensajeCorrect("");
					  navigate('/login');
                  },3000);
			 }).catch((error)=>{
				setMensaje("Error!");
			 	console.log();
                  setTimeout(()=>{
                      setMensaje("");
                  },3000);
				console.error(error);
			 })
			 
          }
	}

	return (
		<Box
			as='form'
			bgcolor='white'
			padding='2em'
			borderRadius='8px'
			onSubmit={handleSubmit}>
			<TextField
				id='outlined-basic'
				label='Usuario'
				variant='outlined'
				margin='normal'
				fullWidth
				name='name'
				value={name}
				onChange={(e)=>handleChange(e)}
			/>
			<TextField
				id='outlined-basic'
				label='Email'
				variant='outlined'
				margin='normal'
				fullWidth
				type='email'
				name='email'
				value={email}
				onChange={(e)=>handleChange(e)}
			/>
			<TextField
				id='outlined-password-input'
				label='Contraseña'
				variant='outlined'
				margin='normal'
				fullWidth
				autoComplete='current-password'
				type='password'
				name='password'
				value={password}
				onChange={(e)=>handleChange(e)}
			/>
			<TextField
				id='outlined-password-input'
				label='Confirmar Contraseña'
				variant='outlined'
				margin='normal'
				fullWidth
				autoComplete='current-password'
				type='password'
				name='repassword'
				value={repassword}
				onChange={(e)=>handleChange(e)}
			/>

			<Button
				variant='contained'
				type='submit'
				sx={theme => ({
					background: theme.palette.custom.blue,
					'&:hover': { background: theme.palette.custom.blue },
					width: '100%',
					marginY: '1rem',
					fontSize: '1rem',
				})}>
				Registrarte
			</Button>
			<Box textAlign='center'>
				<Typography as='span' mr='0.5rem'>
					¿Tienes una cuenta?
				</Typography>
				<Link to='/login'>Inicia sesión</Link>
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

export default SignupForm
