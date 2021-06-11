import React, { useState, useEffect } from "react";
import { AppBar, Button, Toolbar, Typography, Avatar } from "@material-ui/core";
import useStyles from "./style";
import memories from "../../img/memories.png";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import decode from "jwt-decode";
import memoriesLogo from "../../img/memories-Logo.png";
import memoriesText from "../../img/memories-Text.png";

function Navbar() {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  let history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  // useEffect(() => {
  //   let token;
  //   user ? (token = user.token) : "";
  //   if (token) {
  //     const decodeToken = decode(token);
  //     if (decodeToken.exp * 1000 < new Date().getTime()) {
  //       logOut();
  //     }
  //   }
  // }, []);
  const logOut = () => {
    setUser(null);
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };
  console.log("test2");
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to="/" className={classes.brandContainer}>
          {" "}
          <img
            className={classes.image}
            src={memoriesLogo}
            alt="icon"
            height="45px"
          />
          <img src={memoriesText} alt="icon" height="40px" />
        </Link>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              src={user.result.imageUrl}
              className={classes.purple}
              alt={user.result.name}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logOut}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            SIGN IN
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
