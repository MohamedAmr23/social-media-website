import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginData } from "../../interfaces/login.js";
import axios from "axios";

const initialState={
    token:localStorage.getItem('token'),
    isLoading:false,
    error:'',
    isSuccess:false

}
export const login = createAsyncThunk('auth/login', async (values: LoginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`https://linked-posts.routemisr.com/users/signin`, values);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.error);
    }
  });
  
 const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(login.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.token=action.payload.token;
            localStorage.setItem('token',action.payload.token)
            state.error = action.payload.error
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.token = null;
            state.error = action.payload as string;
          });
          
       
    },
})


export const authReducer = authSlice.reducer