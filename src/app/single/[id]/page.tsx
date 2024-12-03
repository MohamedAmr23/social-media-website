'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storeDispatch, storeState } from '../../../redux/store.js'
import { getSinglePost } from '../../../redux/Slice/postsSlice.ts'

import PostDetails from '../../_Components/postdetails/PostDetails.tsx'
import Loading from '../../loading.tsx'
import { Post } from '../../../interfaces/postinterface.js'

const SinglePost = ({params:{id}}:{params:{id:string}}) => {
    const {post , isLoading} : {post:Post|null ,isLoading:boolean} = useSelector((state:storeState)=>state.postReducer)
    const dispatch =  useDispatch<storeDispatch>()

    useEffect(()=>{
        dispatch(getSinglePost(id))
    },[])
  return (
    <>
     {isLoading ? <Loading/> : post?<PostDetails postD={post} allComments={true}/>:''}
    </>
   
  )
}

export default SinglePost