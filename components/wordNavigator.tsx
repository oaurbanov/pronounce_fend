import React, {useState, useEffect, HTMLAttributes} from 'react'

import IconButton from '@material-ui/core/IconButton'
import SkipPreviousTwoTone from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoTone from '@material-ui/icons/SkipNextTwoTone';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( () => ({
mainDiv: {
  width:"400px",
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
  
  const [indexWord, setIndex] = useState(0)
  // const word0 = words[0]== undefined ? "" : words[0]
  const [textToDisplay, setTextToDisplay] = useState("merci");

  const [audio, setAudio] = useState(null)

  const onNext = () => {
    if (indexWord+1 > words.length-1){
      setIndex(0)
      setTextToDisplay(words[0])
      getSpecto(words[0])
      console.log(0)
    }
    else {
      setIndex(indexWord + 1)      
      setTextToDisplay(words[indexWord+1])
      getSpecto(words[indexWord+1])
      console.log(indexWord+1)
    }
  }


  const onPrev = () => {
    if (indexWord-1 < 0){
      setIndex(words.length-1)
      setTextToDisplay(words[words.length-1])
      getSpecto(words[words.length-1])
      console.log(words.length-1)
    }
    else {
      setIndex(indexWord - 1)      
      setTextToDisplay(words[indexWord-1])
      getSpecto(words[indexWord-1])
      console.log(indexWord-1)
    }
  }

  const getSpecto = async (wordStr) => {
    setAudio(new Audio(`http://localhost:5000/audio/${wordStr}`))
    const res = await fetch(`http://localhost:5000/spec/${wordStr}`)
    console.log(res.url)
    onChangeWord(res.url)

    //get audio and play
    //audio.play()

  }


  useEffect( () => {
    setIndex(indexWord)
    setTextToDisplay(textToDisplay)

    // setAudio(new Audio("http://localhost:5000/audio/merci"))
    if (audio){
      audio.play()
    }
  }, [indexWord, textToDisplay] );


  // console.log("wordnavigator words: ")
  // console.log(words)
  
  return (
    <div className={styles.mainDiv}>
      <IconButton onClick={onPrev}>
        <SkipPreviousTwoTone className={styles.btn}/>
      </IconButton>
      <div style={{width:"200px", height:"70px"}}>
        <p className={styles.wordBox}> {`${textToDisplay}`} </p>
      </div>
    {/* <div>
      {articles.map( (article) => (
        <p> {article.id}</p>
      ))}      
    </div> */}
      <IconButton onClick={onNext}>
        <SkipNextTwoTone className={styles.btn}/>
      </IconButton>
    </div>
  )
}



export default WordNavigator


