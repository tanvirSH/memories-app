import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';

import memories from "../../images/memories.png";
import useStyle from "./styles";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyle();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log(user);
  
  const logout = () => {
    dispatch({type: 'LOGOUT'});
    navigate('/');
  }

  useEffect(() => {
    const token = user?.token;

    if(token){
      const decodeToken = decode(token);
      if(decodeToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <div className={classes.brandContainer} >

      
      <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
        Memories
      </Typography>
      <img
        src={memories}
        alt="memories"
        height="60"
        className={classes.image}
      />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple}>
              {user.result.name && user.result.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Signin</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
