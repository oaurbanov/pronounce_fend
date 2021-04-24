import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Link from 'next/link'
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
//TODO: make "Pronounce app" button interactive to home

const useStyles = makeStyles( (theme) => ({
  nav : {
    backgroundColor: "black",
    color:"white",
    
    height: "50px",
    padding: "10px",

    display: "flex",
    alignItems: "center",
  },
  titleBox : {
    justifyContent:"center",
    width:"180px",
    minWidth:"180px",
    height:"40px",
    border:"1px solid white",
    margin:"0px",
    // hover: { cursor: "hand" }
  },
  ul : {
    display: "flex",
    listStyle: "none",
    justifyContent: "center"
  },
  li : {
    margin: "10px"
  },

  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign:"center",
    
    border:"1px solid white",
    maxWidth:"132px",
    minWidth:"132px",
    height:"32px",
  },
}));

const Nav = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            PronounceApp
          </Typography>
          <div style={{flexGrow:1}}></div>
          <Button color="inherit">Contact</Button>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Nav
