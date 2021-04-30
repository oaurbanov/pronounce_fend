import React, {useEffect, useState} from 'react'
import {server} from '../config'
import SpectoBox from '../components/spectoBox'
import WordNavigator from '../components/wordNavigator'
import AppDrawer from '../components/appDrawer'
import next from 'next'


const Home = ({words}) => {
  
  const [word, setWord] = useState('')
  const [indexWord, setIndexWord] = useState(0)

  const [disableBts, setDisableBts] = useState(true)

  useEffect( () => {
    setWord(words[indexWord])
  }, [words, indexWord] );
  
  
  const onNextWord = () => {
    setDisableBts(true)
    let index = (indexWord+1 > words.length-1) ? 0 : indexWord+1
    setIndexWord(index)
  }

  const onPrevWord = async () => {
    setDisableBts(true)
    let index = (indexWord-1 < 0) ? words.length-1 : indexWord-1
    setIndexWord(index)
  }

  return (
    <AppDrawer>

      <div style={{
        display:'flex', 
        flexDirection:"column", 
        alignItems:"center",
        height:"100%",
      }}>
          <WordNavigator word={word} disableButtons= {disableBts} onNext={onNextWord} onPrev={onPrevWord}/>
          <SpectoBox word = {word}  disableBts={disableBts} setDisableBts= {setDisableBts}
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
