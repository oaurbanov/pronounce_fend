import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Recorder from "./recorder"
import Record from "./utils/record"

const SlideRecord = ({audioLen, setDisableBts, disableBts}) => {
  
  // let recorder = new Recorder(audioLen,'cv2')

  let recorder = undefined
  useEffect(() => {
    if(recorder == undefined)
    {
      recorder = new Recorder(audioLen,'cv2')
    }
  })

  // const [recorder, setRecorder] = useState(null)
  // useEffect(() => {
  //   if(recorder == null)
  //   {
  //     setRecorder(new Recorder(audioLen,'cv2'))
  //   }
  // })


  
  let evRecStart=true
  const handleRecStart = async () => {
    console.log("handleRecStart")
    if(recorder && evRecStart){
      evRecStart=false
      
      recorder.start()
      
      
      evRecStart=true
    }
  }
  
  let evRecEnd=true
  const handleRecEnd = async () => {
    console.log("handleRecEnd")
    if (recorder && evRecEnd){
      evRecEnd=false
      setDisableBts(true)

      recorder.stop()

      setDisableBts(false)
      evRecEnd=true
    }
  }
  
  return (
    <div
      style={{
        position:"relative",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        width:"100%",
      }}
    >
      <Record
        style={{
          position:"absolute",
          bottom:"2px",
          right:"2px",
        }}
        recordStart={ handleRecStart}
        recordEnd={handleRecEnd}
        disabled={disableBts}
      />
      <canvas id='cv2' 
        style={{
          width:"100%",
          backgroundColor:"lightGray",
        }}>
      </canvas>
    </div>
  )
}

SlideRecord.propTypes = {
  audioLen : PropTypes.number,
  setDisableBts: PropTypes.func,
  disableBts: PropTypes.bool,
}

export default SlideRecord
