import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slice/login.tsx";
import { postReducer } from "./Slice/postsSlice.ts";

export const store = configureStore({
    reducer:{
        authReducer,
        postReducer
    }
})


export type storeDispatch =typeof store.dispatch

export type storeState = ReturnType<typeof store.getState>