import React from 'react'
import { makeStyles} from "@material-ui/core/styles";

import Play from "./buttons/play.tsx"
import Record from "./buttons/record.tsx"

const useStyles = makeStyles( () => ({
  mainDiv : {
    //backgroundColor: "yellow",
    border: "1px solid black",

    width: "400px",
    height: "300px",

    display: "flex",
    flexDirection: "column",
  },
  
  specto : {
    border: "1px solid black",

    width: "380px",
    height: "150px",
  }

}));

const SpectoBox = () => {
  const styles = useStyles();
  return (
    <div className={styles.mainDiv}>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div className={styles.specto}>
          <p>image of the specto</p>
        </div>
      </div>
      <div style={{display:"flex", justifyContent:"center"}}>
        <Play></Play>
        <Record></Record>
      </div>
    </div>
  )
}

export default SpectoBox