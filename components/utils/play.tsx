import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

import PlayIcon from '@material-ui/icons/PlayCircleFilledWhiteTwoTone';
import IconButton from '@material-ui/core/IconButton'

//TODO: Material UI React Tutorial https://www.youtube.com/watch?v=vyJU9efvUtQ

const useStyles = makeStyles(() => ({
  btn: {
    fontSize: 60,
    color: "green",
  }
}));


const Play = () => {
  
  const styles= useStyles();

  return (
    <IconButton>
      <PlayIcon className={styles.btn} />
    </IconButton>
  )
}

export default Play
