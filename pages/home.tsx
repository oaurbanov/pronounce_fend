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

      <div style={{display:'flex', flexDirection:"column"}}>
       
        <div style={{height:"70px", display: 'flex', flexDirection:"row", justifyContent:'center'}}>
          <WordNavigator words={words} onChangeWord={handleWordChange}/>
        </div>

        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around" }}>
          <SpectoBox imgUrl = {imgUrl} ></SpectoBox>
        </div>
      </div>
    
    </AppDrawer>
  )
}

export default Home
