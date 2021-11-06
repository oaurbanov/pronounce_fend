import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import {createMuiTheme, makeStyles, Theme, ThemeProvider} from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000"
    }
  },
  typography: {
    fontFamily: "Sans-serif",
    fontSize: 12,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  }
})

const useStyles = makeStyles((theme: Theme) => ({
  root:{
    height: "100vh",
    // backgroundColor: "purple",
  }
}));

type AppDrawerProps = {
  tittle?: string;
}

const AppDrawer:React.FC<AppDrawerProps> = ({children}) => {

  const classes = useStyles()

  return (
    <ThemeProvider theme={theme} >
      <Head>
        <title>Pronounce app</title>
        <link rel="icon" href="/favicon.ico" />

        {/* Prevents page stored in cache */}

        {/* <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="-1" />
        <meta httpEquiv="Cache-Control" content="no-store" /> */}

        {/* <meta http-equiv='cache-control' content='no-cache'/>
        <meta http-equiv='expires' content='0'/>
        <meta http-equiv='pragma' content='no-cache'/> */}

<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />

      </Head>

      <div className={classes.root}>
        <Nav/>
        <main style={{height:"100%"}}>
          {children}
        </main>
      </div>
    </ThemeProvider>

  )
}


export default AppDrawer
