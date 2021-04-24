import Home from './home.tsx'
import {server} from '../config'
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

export default function IndexPage({words}) {
  return (
    <ThemeProvider theme={theme} >
      <Home words={words} />
    </ThemeProvider>
  )
}

// <div className={styles.container}>
//   <main className={styles.main}>
//     <SpectoBox></SpectoBox>
//   </main>
// </div>



// data fetching from jsonplaceholder
/* 
getStaticProps: fetch at build time
getServerSicdeProps: fetch data at every request
getStaticPaths: dinamically generate paths based on the data we are fetching
 */
export const getServerSideProps = async () => {
  const res = await fetch(`${server}/words`)
  // const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
  const words = await res.json()

  return {
    props : {
      words
    }
  }
}