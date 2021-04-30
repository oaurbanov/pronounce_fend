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
  word: string,
  disableButtons: boolean,
  onNext: () => void,
  onPrev: () => void,
};

const WordNavigator: React.FC<WordNavigatorProps> = ({
  word,
  disableButtons,
  onNext,
  onPrev,
  ...otherProps
}) => {

  const styles = useStyles();

  return (
    <div {...otherProps} className={styles.mainDiv}>
      <IconButton onClick={onPrev} disabled={disableButtons}>
        <SkipPreviousTwoTone className={styles.btn}/>
      </IconButton>
      <div style={{width:"200px", height:"70px"}}>
        <p className={styles.wordBox}> {`${word}`} </p>
      </div>
      <IconButton onClick={onNext} disabled={disableButtons}>
        <SkipNextTwoTone className={styles.btn}/>
      </IconButton>
    </div>
  )
}



export default WordNavigator


