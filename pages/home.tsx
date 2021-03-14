import React from 'react'
import Head from 'next/head'

import styles from '../styles/Home.module.css'

import Nav from '../components/nav'
import SpectoBox from '../components/spectoBox'
import WordNavigator from '../components/wordNavigator'



const Home = () => {
  return (
    <>
      <Head>
        <title>Pronounce app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav></Nav>
      
      <div style={{display:'flex', flexDirection:"column"}}>
       
        <div style={{height:"70px", display: 'flex', flexDirection:"row", justifyContent:'center'}}>
          <WordNavigator/>
        </div>

        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around" }}>
          <SpectoBox></SpectoBox>
        </div>
      </div>
      
    </>
  )
}

export default Home
