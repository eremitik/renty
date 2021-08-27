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
  },
  links: {
    textDecoration: 'none',
    fontSize: '20px',
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
              { !userInfo ? <MenuItem onClick={handleClose}><Link to="/register">Register</Link></MenuItem> : null }
              { !userInfo ? <MenuItem onClick={handleClose}><Link to="/login">Login</Link> </MenuItem> : null }
              <MenuItem onClick={handleClose}><Link to="/main">See Rentals</Link></MenuItem>
              { !userInfo ? null : <MenuItem onClick={handleClose}><Link to="/form">Post Rental</Link></MenuItem> }
              <MenuItem onClick={logoutSubmit}>Logout</MenuItem>
            </Menu>
          </div>

          <Typography variant="h6" className={classes.title}>
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