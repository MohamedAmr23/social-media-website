import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slice/login.tsx";

export const store = configureStore({
    reducer:{
        authReducer
    }
})


export type storeDispatch =typeof store.dispatch

export type storeState = ReturnType<typeof store.getState>