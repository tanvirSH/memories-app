import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//import GoogleLogin from 'react-google-login';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

import { signin, signup } from "../../actions/auth";
import Input from "./Input";
import useStyles from "./styles";
import Icon from "./icon";

const initialState = { firstname: '', lastname: '', email:'', password:'',confirmpassword:''};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    if(isSignup){
      dispatch(signup(formData, navigate));
    }else{
      dispatch(signin(formData, navigate));
    }

  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value });
  };
  const handleShowPassword = () =>
    setShowPassword((prevpassword) => !prevpassword);
  const switchMode = () => {
    setIsSignup((isSignup) => !isSignup);
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const results = res;

    try {
      dispatch({ type: "AUTH", data: {results, name: 'tanvir'} });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google sign-in failed, try again");
  };

  return (
    <Container maxWidth="xs" component="main">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? "Sign up" : "Sign in"}{" "}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstname"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half={6}
                />
                <Input
                  name="lastname"
                  label="Last Name"
                  handleChange={handleChange}
                  half={6}
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              type={!showPassword ? "password" : "text"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmpassword"
                label="Repete Password"
                type="password"
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign up" : "Sign in"}
          </Button>
          <GoogleOAuthProvider 
            clientId="628934459116-u5h74r8djl71l4uuvb0bp03aufe5gqkf.apps.googleusercontent.com"
            scope="https://www.googleapis.com/auth/drive.metadata.readonly"  
          >
            <GoogleLogin
              clientId="628934459116-u5h74r8djl71l4uuvb0bp03aufe5gqkf.apps.googleusercontent.com"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              scope="https://www.googleapis.com/auth/drive.metadata.readonly"  
              cookiePolicy="single_host_origin"
            />
          </GoogleOAuthProvider>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
