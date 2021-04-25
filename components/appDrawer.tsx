import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Nav from '../components/nav'
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import {blueGrey} from '@material-ui/core/colors'

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


type AppDrawerProps = {
  tittle?: string;
}

const AppDrawer:React.FC<AppDrawerProps> = ({children, title}) => {

  return (
    <ThemeProvider theme={theme} >
      <Head>
        <title>Pronounce app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav/>
      
      <main>
        {children}
      </main>
    </ThemeProvider>

  )
}


export default AppDrawer
