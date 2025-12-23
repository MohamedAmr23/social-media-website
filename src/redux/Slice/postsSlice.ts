import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../interfaces/postinterface.js";
import axios from "axios";
const initialState:{posts:Post[] , isLoading:boolean ,post:Post|null} = {post:null,posts:[],isLoading:false}
const headers = {token : localStorage.getItem('token')}
export const getPosts = createAsyncThunk('posts/getPosts',async()=>{
    const {data} = await axios.get('https://linked-posts.routemisr.com/posts?limit=50',{
        headers
    })
    return data.posts
})
export const getSinglePost = createAsyncThunk('posts/getSinglePost',async(postId:string)=>{
    const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}`,{
        headers
    })
    return data.post
})
const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(getPosts.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(getPosts.fulfilled,(state , action)=>{
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            state.isLoading = false,
            state.posts = action.payload
        })
       builder.addCase(getPosts.rejected,(state)=>{
        state.isLoading = false ;
       })
    //    builder to single post
        builder.addCase(getSinglePost.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(getSinglePost.fulfilled,(state , action)=>{
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            state.isLoading = false,
            state.post = action.payload
        })
       builder.addCase(getSinglePost.rejected,(state)=>{
        state.isLoading = false ;
       })
    }
})

export const postReducer = postsSlice.reducer