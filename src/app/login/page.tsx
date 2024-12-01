"use client";
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import { LoginData } from "../../interfaces/login.js";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "../../redux/store.ts";
import { login } from "../../redux/Slice/login.tsx";
import { useRouter } from "next/navigation.js";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Login() {
  const initialValues: LoginData = {
    email: "",
    password: "",
  };
  // async function onSubmit(values:LoginData){
  //   const { data } = await axios.post(`https://linked-posts.routemisr.com/users/signin`,values)
  //   console.log( data )
  // }
  const dispatch = useDispatch<storeDispatch>();
  const { token, isLoading, error, isSuccess } = useSelector(
    (state: storeState) => state.authReducer
  );
  const { push } = useRouter();
  // const { handleSubmit, handleChange, values } = useFormik({
  //   initialValues,
  //   onSubmit: async (values) => {
  //     await dispatch(login(values));
  //     if (token) {
  //       push("/");
  //     } else {
  //       toast.error(error);
  //       console.log(error);
  //     }
  //   },
  // });
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const result = await dispatch(login(values));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Logged in successfully!");
      } else {
        toast.error( "Invalid email or password");
      }
    },
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      push("/");
    }
  }, [token, push]);
  return (
    <Container>
      <Paper elevation={10} sx={{ m: 3, p: 3 }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <h2>Login Now</h2>
          <TextField
            value={values.email}
            onChange={handleChange}
            id="email"
            label="Email"
            type="email"
            variant="standard"
            fullWidth
          />
          <TextField
            value={values.password}
            onChange={handleChange}
            id="password"
            label="Password"
            type="password"
            variant="standard"
            fullWidth
          />
          {isLoading ? (
            <Button type="button" variant="contained">
              <CircularProgress color="inherit" />
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              Login
            </Button>
          )}
        </form>
      </Paper>
    </Container>
  );
}
