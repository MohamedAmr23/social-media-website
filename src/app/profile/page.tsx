'use client'
import { Button, Container, Paper, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const Profile = () => {
  async function addPost(values){
    const {data} = await axios.post('https://linked-posts.routemisr.com/posts',values,{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    toast.success('Posted Successfully')
    console.log(data)
  }
  function handleSubmit(e:Event){
    e.preventDefault()
    const body = e.target?.body.value
    const image =e.target?.image.files[0]

    const formData = new FormData()
    formData.append('body',body)
    formData.append('image',image)
    addPost(formData)

  }
  return (
    <Container>
    <Paper elevation={10} sx={{ m: 3, p: 3 }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <h2>Post Now</h2>
        <TextField
          // name='body'
          id="body"
          // label="body"
          type="text"
          multiline
          rows={4}
          // variant="standard"
          fullWidth
          defaultValue={'default Value'}
        />
        {/* <TextField
          name='image'
          id="image"
          label="image"
          type="file"
          variant="standard"
          fullWidth
        /> */}
          <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                id='image'
              />
          </Button>
       
          <Button type="submit" variant="contained">
            Post
          </Button>
       
      </form>
    </Paper>
  </Container>
  )
}

export default Profile