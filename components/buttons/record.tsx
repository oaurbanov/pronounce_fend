import React from 'react'

import {makeStyles} from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import MicIcon from '@material-ui/icons/MicTwoTone';

const useStyles = makeStyles(() => ({
  btn: {
    fontSize: 50,
    color: "red",
  }
}));

const Record = () => {
  const styles = useStyles();
  return (
    <IconButton>
      <MicIcon className={styles.btn} />
    </IconButton>
  )
}

export default Record
