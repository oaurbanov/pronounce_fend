import React from 'react'
import { NextPage } from 'next'
import AppDrawer from '../components/appDrawer'
import { makeStyles } from '@material-ui/core';
import LinkComponent from '../components/utils/linkComponent'


const useStyles = makeStyles( () => ({

  root : {
    display: "flex",
    flexDirection: "column",
    
    margin:"10px",
    padding:"10px",
    
    alignItems:"center",
  },
}));



const ContactPage: NextPage = () => {
  
  const classes = useStyles()

  return (
    <AppDrawer>
      <div className={classes.root}>
        <div style={{height:"80px"}}></div>
        <p>
          My networks:
          <br/>
          <br/>

          <LinkComponent link={ "https://oaurbanov.portfoliobox.net" }/>
          <LinkComponent link={ "https://github.com/oaurbanov" }/>
          <LinkComponent link={ "https://www.linkedin.com/in/oscar-urbano" }/>
        
        </p>

      </div>

    </AppDrawer>
  )
}

export default ContactPage
