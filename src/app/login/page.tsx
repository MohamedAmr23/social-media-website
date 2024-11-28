'use client'
import { Button, Container, Paper, TextField } from "@mui/material";
import { LoginData } from "../../interfaces/login.js";
import { useFormik } from "formik";
import axios from "axios";

export default function Login(){
  const initialValues:LoginData={
    email:'',
    password:''
  }
  async function onSubmit(values:LoginData){
    const { data } = await axios.post(`https://linked-posts.routemisr.com/users/signin`,values)
    console.log( data )
  }
  const {handleSubmit,handleChange,values} = useFormik({
    initialValues,
    onSubmit
  })
  return (
    <Container>
      <Paper elevation={10} sx={{m:3,p:3}}>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          <h2>Login Now</h2>
          <TextField value={values.email} onChange={handleChange} id="email" label="Email" type="email" variant="standard" fullWidth />
          <TextField value={values.password} onChange={handleChange} id="password" label="Password" type="password" variant="standard" fullWidth />
          <Button type="submit" variant="contained">Login</Button>
        </form>
      </Paper>
    </Container>
  )
}