import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import MicIcon from '@material-ui/icons/MicTwoTone';

const useStyles = makeStyles(() => ({
  btn: {
    fontSize: 50,
    color: "red",
  }
}));

const Record = (props) => {
  const styles = useStyles();
  return (
    <IconButton 
      onMouseDown={props.recordStart}
      onPointerDown={props.recordStart}

      onMouseUp={props.recordEnd}
      onPointerUp={props.recordEnd}
      onMouseLeave={props.recordEnd}
      onPointerLeave={props.recordEnd}

      onClick={undefined}
      disabled={props.disabled}
    >
      <MicIcon className={styles.btn} />
    </IconButton>
  )
}

Record.propTypes = {
  recordStart : PropTypes.func,
  recordEnd : PropTypes.func,
  disabled : PropTypes.bool,
}

export default Record
