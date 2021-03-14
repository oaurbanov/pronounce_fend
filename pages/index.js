import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Nav from '../components/nav.tsx'
import SpectoBox from '../components/spectoBox.tsx'

//TODOs: 

export default function Home() {
  return (
    <>
      <Head>
        <title>Pronounce app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav></Nav>
      
      <div style={{display:'flex', flexDirection:"column"}}>
        <div style={{height:"40px"}}></div>
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around" }}>
          <SpectoBox></SpectoBox>
        </div>
      </div>
      
    </>
  )
}

// <div className={styles.container}>
//   <main className={styles.main}>
//     <SpectoBox></SpectoBox>
//   </main>
// </div>