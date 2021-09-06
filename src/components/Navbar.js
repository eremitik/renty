import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions.js'
import Search from './Search.js';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    boxShadow: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  profileButton: {
    alignItem: 'right',
    fontFamily: 'Montserrat',
    background: 'white',
    border: '1px solid #D3D3D3',
    borderRadius: '20px',
    color: 'black',
    fontWeight: 'bold',
    transition: '0.3s',
    cursor: 'pointer',
    padding: '10px',
    paddingRight: '20px',
    paddingLeft: '20px',
    marginTop: '1px',
    marginBottom: '3px',
    '&:hover': {
      background: '#F5F5F5',
    }
  },
  title: {
    flexGrow: 1,
    fontWeight: '800',
    fontSize: '30px',
    textDecoration: 'none',
    color: 'black',
  },
  links: {
    textDecoration: 'none',
    fontSize: '20px',
    color: 'red',
  },
  menuIcon: {
    fontSize: '35px',
    fontWeight: '800',
  }
}));


export default function Navbar() {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const logoutSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(logout())
      history.push('/login')
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
      <AppBar className={classes.navBar} position="fixed" color="inherit">
        <Toolbar>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              edge="start"
              className={classes.menu}
            >
              <MenuIcon className={classes.menuIcon}/>
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
          <Typography variant="h6" className={classes.title} component={Link} to="/main">RENTY</Typography>
          <Search />

              { !userInfo ? 
                <Link to="/login"><button style={{color:"black"}} className={classes.profileButton}>Sign in</button></Link> :
                <Link to="/profile"><button style={{color:"black"}} className={classes.profileButton}>Profile</button></Link>
              }
        </Toolbar>
      </AppBar>
  );
}