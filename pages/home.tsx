import React, {useState} from 'react'
import {server} from '../config'
import SpectoBox from '../components/spectoBox'
import WordNavigator from '../components/wordNavigator'
import AppDrawer from '../components/appDrawer'


const Home = ({words}) => {

  
  const [imgUrl, setImgUrl] = useState(`${server}/spec/merci`)

  const handleWordChange = (newUrl : string) => {
    setImgUrl(newUrl)
  }
  
  return (
    <AppDrawer>

      <div style={{
        display:'flex', 
        flexDirection:"column", 
        alignItems:"center",
        height:"100%",
      }}>
          <WordNavigator words={words} onChangeWord={handleWordChange}/>
          <SpectoBox imgUrl = {imgUrl}
            style={{
              width: "80%",
              height: "80%",
            }}
          />
      </div>
    
    </AppDrawer>
  )
}

export default Home
