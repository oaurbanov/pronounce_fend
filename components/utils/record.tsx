import React, { HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import MicIcon from '@material-ui/icons/MicTwoTone';

const useStyles = makeStyles(() => ({
  btn: {
    fontSize: 55,
    color: "red",
    backgroundColor:"white",
    // backgroundColor: "rgb(230,211,225)",
    borderRadius:"40px",
  }
}));

type RecordProps = HTMLAttributes<HTMLDivElement> &{
  recordStart : () => void,
  recordEnd : () => void,
  disabled : boolean,
}

const Record : React.FC<RecordProps> = ({
  recordStart,
  recordEnd,
  disabled,
  ...otherProps
}) => {
  const styles = useStyles();
  return (
    <div {...otherProps}>
      <IconButton 
        onMouseDown={recordStart}
        onPointerDown={recordStart}

        onMouseUp={recordEnd}
        onPointerUp={recordEnd}
        onMouseLeave={recordEnd}
        onPointerLeave={recordEnd}

        onClick={undefined}
        disabled={disabled}
      >
        <MicIcon className={styles.btn} />
      </IconButton>
    </div>
  )
}

export default Record
