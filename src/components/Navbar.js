import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions.js'
import Search from './Search.js';

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
    // backdropFilter: 'blur(8px)',
  },
  navBar: {
    boxShadow: 'none',
    opacity: 0.9,
    // filter: 'blur(8px)',
  },
  toolBar: {
    // backdropFilter: 'blur(3px)',
    // filter: 'blur(8px)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'black',
  },
  links: {
    textDecoration: 'none',
    fontSize: '20px',
    color: 'red',
  },
}));


export default function Navbar() {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.root}>
      <AppBar className={classes.navBar} position="fixed" color="inherit" sx={{backdropFilter: "blur(5px)"}}>
        <Toolbar className={classes.toolBar}>

          <div className={classes.blurDiv}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              edge="start"
              className={classes.menu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              className={classes.link}
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
              <MenuItem className={classes.link} onClick={handleClose} component={Link} to="/">Home</MenuItem>
              { !userInfo ? <MenuItem onClick={handleClose} component={Link} to="/register">Register</MenuItem> : null }
              { !userInfo ? <MenuItem onClick={handleClose} component={Link} to="/login">Login</MenuItem> : null }
              <MenuItem onClick={handleClose} component={Link} to="/main">See Rentals</MenuItem>
              { !userInfo ? null : <MenuItem onClick={handleClose} component={Link} to="/form">Post Rental</MenuItem> }
              <MenuItem onClick={logoutSubmit}>Logout</MenuItem>
            </Menu>
          </div>

          <Typography variant="h6" className={classes.title} component={Link} to="/main">
            {/* <Link to="/main">RENTY</Link> */}
            RENTY
          </Typography>
          <Search />
              { !userInfo ? 
                <Link to="/login"><AccountCircle style={{color:"black"}}></AccountCircle></Link> :
                <Link to="/profile"><AccountCircle style={{color:"black"}}></AccountCircle></Link>
              }
        </Toolbar>
      </AppBar>
    </div>
  );
}