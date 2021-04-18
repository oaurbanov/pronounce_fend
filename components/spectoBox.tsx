import React from 'react'
import { makeStyles} from "@material-ui/core/styles";

import Play from "./buttons/play"
import Record from "./buttons/record"

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
  },

  spectoRecord : {
    border: "1px solid black",

    width: "380px",
    height: "150px",

    display: "flex",
    justifyContent: "center",
    // alignContent: "center",
  }
}));


const SpectoBox = ({imgUrl}) => {
  const styles = useStyles();
  return (
    <div className={styles.mainDiv}>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div className={styles.specto}>
          {/* <p> {imgUrl} </p> */}
          <img src={imgUrl} alt="not yet queried" 
            style={{
              width:"100%", 
              // height:"40px",
              display: "flex",
            }}
          />
        </div>
      </div>

      <div style={{height:"5px"}}></div>
      
      <div style={{display:"flex", justifyContent:"center"}}>
        <div className={styles.spectoRecord}>
          <Record></Record>
          {/* TODO: record audio, send to the backend and get the spectogram
                    to paint it under the first spectogram, and compare */}
        </div>
      </div>
    </div>
  )
}

export default SpectoBox