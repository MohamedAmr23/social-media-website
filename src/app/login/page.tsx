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
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "../../redux/store";
import { login } from "../../redux/Slice/login";
import { useRouter } from "next/navigation.js";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Login() {
  const initialValues: LoginData = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch<storeDispatch>();
  const { token, isLoading} = useSelector(
    (state: storeState) => state.authReducer
  );
  const { push } = useRouter();
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
