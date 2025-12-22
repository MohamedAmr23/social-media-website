import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slice/login";
import { postReducer } from "./Slice/postsSlice";

export const store = configureStore({
    reducer:{
        authReducer,
        postReducer
    }
})


export type storeDispatch =typeof store.dispatch

export type storeState = ReturnType<typeof store.getState>