import React, {useState, HTMLAttributes} from 'react'

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
  text?: string,
  onClickNext?: () => void,
  onClickPrev?: () => void,
};

const WordNavigator: React.FC<WordNavigatorProps> = ({
  text,
  onClickNext,
  onClickPrev,
  ...otherProps
}) => {

  const styles = useStyles();

  if (text === undefined) { text= "Text of the sound to play"}
  const [textToDisplay, setTextToDisplay] = useState(text);

  return (
    <div className={styles.mainDiv}>
      <IconButton>
        <SkipPreviousTwoTone className={styles.btn}/>
      </IconButton>
      <div style={{width:"200px", height:"70px"}}>
        <p className={styles.wordBox}> {`${textToDisplay}`} </p>
      </div>
      <IconButton>
        <SkipNextTwoTone className={styles.btn}/>
      </IconButton>
    </div>
  )
}

export default WordNavigator
