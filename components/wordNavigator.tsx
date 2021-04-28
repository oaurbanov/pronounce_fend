import React, {useState, useEffect, HTMLAttributes} from 'react'
import {server} from '../config'
import IconButton from '@material-ui/core/IconButton'
import SkipPreviousTwoTone from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoTone from '@material-ui/icons/SkipNextTwoTone';
import { makeStyles } from '@material-ui/core';

import {handleErrors} from '../utils'


const useStyles = makeStyles( () => ({
mainDiv: {
  width:"360px",
  display: 'flex',
  flexDirection:"row",
  justifyContent:'center',
  alignContent:"center"
},
wordBox: {
  textAlign:"center",
  lineHeight:"70px",
  margin:"0px",
  fontStyle:"italic"
},
btn: {
  fontSize:50,
  color: "orange"
},
}));

type WordNavigatorProps = HTMLAttributes<HTMLDivElement> &{
  words?: any,
  text?: string,
  onChangeWord?: (newUrl:string) => void,
};

const WordNavigator: React.FC<WordNavigatorProps> = ({
  words,
  text,
  onChangeWord,
  ...otherProps
}) => {

  const styles = useStyles();

  if (text === undefined) { text= "Text of the sound to play"}

  const [disableButton, setDisableButton] = useState(false)
  
  const [indexWord, setIndex] = useState(0)
  // const word0 = words[0]== undefined ? "" : words[0]
  const [textToDisplay, setTextToDisplay] = useState("merci");

  const [audio, setAudio] = useState(null)

  const onNext = async () => {
    setDisableButton(true)
    document.body.style.cursor='wait';
    if (indexWord+1 > words.length-1){
      setIndex(0)
      setTextToDisplay(words[0])
      await getSpecto(words[0])
      console.log(0)
    }
    else {
      setIndex(indexWord + 1)      
      setTextToDisplay(words[indexWord+1])
      await getSpecto(words[indexWord+1])
      console.log(indexWord+1)
    }
    setDisableButton(false)
  }


  const onPrev = async () => {
    setDisableButton(true)
    document.body.style.cursor='wait';
    if (indexWord-1 < 0){
      setIndex(words.length-1)
      setTextToDisplay(words[words.length-1])
      await getSpecto(words[words.length-1])
      console.log(words.length-1)
    }
    else {
      setIndex(indexWord - 1)      
      setTextToDisplay(words[indexWord-1])
      await getSpecto(words[indexWord-1])
      console.log(indexWord-1)
    }
    setDisableButton(false)
  }

  const getSpecto = async (wordStr) => {

    try {
      setAudio(new Audio(`${server}/audio/${wordStr}`))
      const res = await fetch(`${server}/spec/${wordStr}`)
      console.log(res.url)
      onChangeWord(res.url)
      
      // setAudio(new Audio(`${server}/audio/${wordStr}`))
      // return fetch(`${server}/spec/${wordStr}`,{
      //   method: 'GET'
      // })
      //   .then(handleErrors)
      //   .then( (res) => {
      //     console.log(res.url)
      //     onChangeWord(res.url)
      //     // audio.play()
      //   })
  
      
    } catch (error) {
      console.log(error)
    }

  }


  useEffect( () => {
    setIndex(indexWord)
    setTextToDisplay(textToDisplay)

    // setAudio(new Audio(`${server}/audio/merci`))
    if (audio && !disableButton){
      // This is playing once disableButton is false. i.e. once spec image is retrieved
      audio.play()
      document.body.style.cursor='default';
    }
  }, [indexWord, textToDisplay, disableButton] );


  // console.log("wordnavigator words: ")
  // console.log(words)
  
  return (
    <div {...otherProps} className={styles.mainDiv}>
      <IconButton onClick={onPrev} disabled={disableButton}>
        <SkipPreviousTwoTone className={styles.btn}/>
      </IconButton>
      <div style={{width:"200px", height:"70px"}}>
        <p className={styles.wordBox}> {`${textToDisplay}`} </p>
      </div>
      <IconButton onClick={onNext} disabled={disableButton}>
        <SkipNextTwoTone className={styles.btn}/>
      </IconButton>
    </div>
  )
}



export default WordNavigator


