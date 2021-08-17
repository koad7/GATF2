import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar,Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
// import logo from "./logo.png";
import firebase from './firebase';
// import logo from "./Dashboard/data/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold", // or 'bold'
    color: "#174B88" // or 'bold'
  },
  logo: {
    maxWidth: 150,
    margin: '10px',
    align: 'left',
  }
}));

export default function Header(props) {
  const classes = useStyles();
  if(!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.history.replace('/login')
		return null
    }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit"  >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          {/* <img src={logo} alt="GATF" className={classes.logo} /> */}
          <Typography variant="h4" align="center"  color="inherit" className={classes.title} >
          Projects Tracking Dashboard
          </Typography>
          {/* <Button type="submit" fullWidth variant="contained" color="secondary" onClick={logout} className={classes.submit}>
					Logout
                </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
  // async function logout() {
	// 	await firebase.logout()
	// 	//use for routing
	// 	props.history.push('/')
	// 	//
	// 	//
	// }
}
