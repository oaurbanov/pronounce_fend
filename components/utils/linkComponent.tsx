import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types'


const useStyles = makeStyles( () => ({
  link: {
    color:"blue",
  }
}));

type props = {
  link: string,
  alias?: string,
}

const LinkComponent = (props) => {
  
  const classes = useStyles()
  
  return(
    <div
      style={{
        minHeight:"22px",

      }}
    >
        <a 
          className={classes.link} 
          target="_blank"
          href= {props.link}
        >
          { props.alias === undefined ? (`${props.link}`) : (`${props.alias}`)}
        </a>
        <br/>
    </div>
  )
}

export default LinkComponent
