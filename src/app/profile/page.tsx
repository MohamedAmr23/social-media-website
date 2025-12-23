'use client'
import { Button, Container, Paper, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import toast from 'react-hot-toast'

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
})

const Profile = () => {

  async function addPost(values: FormData): Promise<void> {
    await axios.post(
      'https://linked-posts.routemisr.com/posts',
      values,
      {
        headers: {
          token: localStorage.getItem('token') || ''
        }
      }
    )
    toast.success('Posted Successfully')
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    addPost(formData)
  }

  return (
    <Container>
      <Paper elevation={10} sx={{ m: 3, p: 3 }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <h2>Post Now</h2>

          <TextField
            name="body"
            id="body"
            multiline
            rows={4}
            fullWidth
            defaultValue="default Value"
          />

          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
          >
            Upload image
            <VisuallyHiddenInput
              type="file"
              name="image"
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
