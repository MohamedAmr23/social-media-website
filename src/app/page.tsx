'use client'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { storeDispatch, storeState } from "../redux/store.js"
import { getPosts } from "../redux/Slice/postsSlice.ts"
import Loading from "./loading.tsx"
import { useRouter } from "next/navigation.js"
import PostDetails from "./_Components/postdetails/PostDetails.tsx"
import { Container } from "@mui/material"
import { Post } from "../interfaces/postinterface.js"

export default function Home(){
  const {push} = useRouter()
  const dispatch =useDispatch<storeDispatch>()
  const {posts , isLoading} = useSelector((state:storeState)=>state.postReducer)
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      push('/login')
    }else{
      dispatch(getPosts())
    }
  },[])
  return (
    <>
    {isLoading?<Loading/>:<Container maxWidth={'sm'}>
      {posts.map((post:Post)=><PostDetails key={post._id} postD={post}/>)}
      </Container> }
      
    </>
  )
}