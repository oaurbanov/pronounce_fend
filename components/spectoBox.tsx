import React, { HTMLAttributes } from 'react'
import { makeStyles} from "@material-ui/core/styles";

import Play from "./utils/play"
import Record from "./utils/record"

// TODO: record audio, send to the backend and get the spectogram
//       to paint it under the first spectogram, and compare


const useStyles = makeStyles( () => ({
  mainDiv : {
    //backgroundColor: "yellow",
    border: "1px solid black",

    minWidth: "360px",
    
    display: "flex",
    flexDirection: "column",
  },
  
  spectoDiv : {
    // backgroundColor:"orange",
    flex:1,
    border: "1px solid black",
    
    width: "100%",
    
    display:"flex",
    justifyContent:"center", 
  },
  
  spectoRecordDiv : {
    // backgroundColor:"yellow",
    border: "1px solid black",
    width: "100%",
    flex:1,
    
    display: "flex",
    justifyContent: "center",
  }
}));

type SpectoBoxProps = HTMLAttributes<HTMLDivElement> &{
  imgUrl: string,
}

const SpectoBox: React.FC<SpectoBoxProps> = ({
  imgUrl,
  ... otherProps
}) => {
  const styles = useStyles();
  return (
    <div {...otherProps} className={styles.mainDiv}>

      <div className={styles.spectoDiv}>
        <img src={imgUrl} alt="not yet queried" 
          style={{
            width:"100%", //no respect of flex height
          }}
        />
      </div>

      {/* <div style={{
        height:"5px",
        // backgroundColor:"green",
      }}/> */}
      
      <div className={styles.spectoRecordDiv}>
        <Record></Record>
      </div>

    </div>
  )
}

export default SpectoBox