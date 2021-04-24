import React, {useState} from 'react'
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

import useWindowSize from '../utils'
import {PHONE_WIDTH} from '../config'

const useStyles = makeStyles( (theme) => ({
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

const Logo = () => {
  const classes = useStyles();
  return(
    <Typography 
      variant="h6"
      className={classes.title}
    >
      <Link href={'/contact'} >
        PronounceApp
      </Link>
    </Typography>
  )
} 

const Nav = () => {
  
  const classes = useStyles();

  const { width } = useWindowSize();
  const [menuClicked, setMenuClicked] = useState(false)
  

  return (
    <div className={classes.root}>
      <AppBar position="static">
          {width <= PHONE_WIDTH ?(
            <>
              <div 
                style={{
                  display:"flex",
                  alignItems:"center",
                }}
              >
                <IconButton 
                  edge="start" className={classes.menuButton} 
                  color="inherit" aria-label="menu"
                  onClick={()=>{
                    setMenuClicked(!menuClicked)
                  }}
                >
                  <MenuIcon/>
                </IconButton>
                <Logo/>
              </div>
              {menuClicked && (
                <>
                  <Link  href={'/contact'} >
                    <Button color="inherit" >Contact</Button>                
                  </Link>
                  <Link href={'/about'} >
                    <Button color="inherit" >About</Button>
                  </Link>
                </>
              )}
            </>
          ):
          (
            <Toolbar>
              <Logo/>
              <div style={{flexGrow:1}}></div>
              <Link  href={'/contact'} >
                <Button color="inherit" >Contact</Button>                
              </Link>
              <Link href={'/about'} >
                <Button color="inherit" >About</Button>
              </Link>
            </Toolbar>

          )}
      </AppBar>
    </div>
  )
}

export default Nav
