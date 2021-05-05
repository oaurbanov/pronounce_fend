import React from 'react'
import PropTypes from 'prop-types'
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


const Play = (props) => {
  
  const styles= useStyles();

  return (
    <IconButton onClick={props.onClick} disabled={props.disabled}>
      <PlayIcon className={styles.btn} />
    </IconButton>
  )
}

Play.propTypes = {
  onClick : PropTypes.func,
  disabled : PropTypes.bool,
}

export default Play
