import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions.js'
// import { Context } from "../Store";
// import { useHistory } from "react-router";
// import React, { useContext } from "react";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  links: {
    textDecoration: 'none',
    fontSize: '20px',
  }
}));


export default function Navbar() {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [auth, setAuth] = React.useState(true);

  // const logoutFunct = () => {
  //   localStorage.setItem("jwt", "");
  //   dispatch(logout());
  //   window.location.reload();
  // };

  const logoutSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(logout())
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              edge="start"
              class={classes.menu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to="/register">Register</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to="/login">Login</Link> </MenuItem>
              <MenuItem onClick={handleClose}><Link to="/main">See Rentals</Link></MenuItem>
              <MenuItem onClick={logoutSubmit}>Logout</MenuItem>
            </Menu>
          </div>

          <Typography variant="h6" className={classes.title}>
            Renty
          </Typography>
          {auth && (
            <AccountCircle />
          )}
        </Toolbar>
      </AppBar>
    </div>






    // <div>
    //     {userInfo ? (
    //         <>
    //             <Link to="/notes">Go to notes</Link>
    //             <button onClick={logoutFunct}>Log out</button>
    //         </>
    //     ) : (
    //         <>
    //             <Link to="/register">Register</Link> <br />
    //             <Link to="/login">Login</Link>
    //         </>
    //     )}
    // </div>
  );
}