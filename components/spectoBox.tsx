import React, {HTMLAttributes, ReactPropTypes, useEffect, useState} from 'react'
import { makeStyles} from "@material-ui/core/styles";

import SlideImg from "./slideImg"
import SlideRecord from "./slideRecord"
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
  word: string,
  disableBts: boolean,
  setDisableBts: any,
}

const SpectoBox: React.FC<SpectoBoxProps> = ({
  word,
  disableBts,
  setDisableBts,
  ... otherProps
}) => {

  const styles = useStyles();


  const [audioLen, setAudioLen] = useState(0)

  const [recorded, setRecorded] = useState(false)

  return (
    <div {...otherProps} className={styles.mainDiv}>

      <div className={styles.spectoDiv}>
        <SlideImg 
          word={word} 
          setAudioLen={setAudioLen}
          setDisableBts={setDisableBts}
          disableBts={disableBts}
          canvasId={'cv'}
          />
      </div>

      <div style={{
        height:"5px",
        // backgroundColor:"green",
      }}/>
      
      <div className={styles.spectoRecordDiv}>

        {!recorded && (
          <SlideRecord 
            audioLen={audioLen}
            setDisableBts={setDisableBts}
            disableBts={disableBts}
            setRecorded={setRecorded}
          />
        )}
        {recorded && (
          <SlideImg 
            word={'new'} 
            setAudioLen={setAudioLen}
            setDisableBts={setDisableBts}
            disableBts={disableBts}
            canvasId={'cv3'}
          />        
        )}
      </div>
    </div>
  )
}

export default SpectoBox
