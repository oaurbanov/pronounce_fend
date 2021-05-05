import React, { HTMLAttributes } from 'react'
import {makeStyles} from '@material-ui/core/styles'

import PlayIcon from '@material-ui/icons/PlayCircleFilledWhiteTwoTone';
import IconButton from '@material-ui/core/IconButton'

//TODO: Material UI React Tutorial https://www.youtube.com/watch?v=vyJU9efvUtQ

const useStyles = makeStyles(() => ({
  btn: {
    fontSize: 60,
    color: "green",
    backgroundColor:"white",
    // backgroundColor: "rgb(184,217,190)",
    borderRadius:"40px",
  },
}));

type PlayProps = HTMLAttributes<HTMLDivElement> &{
  disabled : boolean,
  onClick : () => void,
}

const Play : React.FC<PlayProps> = ({
  disabled,
  onClick,
  ...otherProps
}) => {
  
  const styles= useStyles();

  return (
    <div {...otherProps} >
      <IconButton onClick={onClick} disabled={disabled}>
        <PlayIcon className={styles.btn} />
      </IconButton>
    </div>
  )
}

export default Play
