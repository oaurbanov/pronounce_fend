import Home from './home.tsx'

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
  const res = await fetch('http://localhost:5000/words')
  // const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
  const words = await res.json()

  return {
    props : {
      words
    }
  }
}