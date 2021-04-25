import React from 'react'
import {NextPage} from 'next'
import AppDrawer from '../components/appDrawer'
import { makeStyles } from '@material-ui/core'
import LinkComponent from '../components/utils/linkComponent'


const useStyles = makeStyles( () => ({

  root : {
    display: "flex",
    flexDirection: "column",
    
    margin:"10px",
    padding:"10px",
    
    alignItems:"center",
  }
}));

const AboutPage:NextPage = () => {

  const classes = useStyles()

  return (
    <AppDrawer>
      <div className={classes.root}>
        <img src="/logo.png" alt="logo image not found" style={{width:"320px"}}/>
        <p> 
          Visualize and correct pronunciation based on spectrograms
        </p>

        <LinkComponent link={ "https://github.com/oaurbanov/pronounce_fend"} alias={"FronEnd code"} />
        <LinkComponent link={ "https://github.com/oaurbanov/pronounce_bend"} alias={"BackEnd code"} />

      </div>
    </AppDrawer>
  )
}

export default AboutPage
