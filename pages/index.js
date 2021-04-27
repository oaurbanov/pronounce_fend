import Home from './home.tsx'
import {server} from '../config'


export default function IndexPage({words}) {
  return (
    <Home words={words} />
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

  let words = []

  try {
    const res = await fetch(`${server}/words`)
    // const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
    words = await res.json()
    
  } catch (error) {
    console.log(error)
  }

  return {
    props : {
      words
    }
  }
}