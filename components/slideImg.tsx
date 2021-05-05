import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Play from "./utils/play"
import {server} from '../config'


const SlideImg = (props) => {
 
  const [image, setImage] = useState(null)
  const [audio, setAudio] = useState(null)
  const [loadedImage, setLoadedImage] = useState(false)
  const [loadedAudio, setLoadedAudio] = useState(false)

  let x = 0
  const slide = () => {
    try {
      const canvas = document.getElementById('cv') as HTMLCanvasElement;
      var ctx = canvas.getContext('2d');
      
      const W = canvas.width
      const H = canvas.height
      
      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(image, 0, 0, W, H);

      console.log("--", {"currentTime": audio.currentTime, "duration":audio.duration} )
  
      x = ( (audio.currentTime === 0 )|| (audio.currentTime === undefined) ) ? 
        x+Math.round(W*0.05) : 
        Math.round(W * audio.currentTime/audio.duration)
      ctx.fillStyle = 'lightGray';
      ctx.fillRect(x, 0, W, H);
  
      if (x < W){
        window.requestAnimationFrame(()=>slide())
      }
      else{
        props.setDisableBts(false)
      }
      
    } catch (error) {
      console.log("Error on slide: ", error);
    }
  }
  
  useEffect(() => {
    if (!(image)){
      setImage(new Image())
    }
  }) 
  
  useEffect(() => {
    if (image) {
      image.src = `${server}/spec/${props.word}`
    }
    setAudio(new Audio(`${server}/audio/${props.word}`))
    setLoadedImage(false)
    setLoadedAudio(false)
  }, [props.word])

  useEffect(() => {
    if (audio){
      audio.addEventListener('loadeddata', () => {
        setLoadedAudio(true) 
        props.setAudioLen(audio.duration)
      })
      document.body.style.cursor='default';
    }
    if (image) {
      image.onload = () => {
        setLoadedImage(true)
        //slide(true)
      }
    }
    
  }, [audio, image])
  
  useEffect(() => {
    if(loadedImage && loadedAudio){
      //TODO: this should be Promise, when resolved setDisableBts(false)
      audio.play() //TODO: handle exc: user has not interact
      slide()
    }
  }, [loadedImage, loadedAudio])
  
  const onPlay = () => {
    console.log("onPlay");
    console.log(loadedImage, loadedAudio);
    if(loadedImage && loadedAudio){
      props.setDisableBts(true)
      //TODO: this should be Promise, when resolved setDisableBts(false)
      audio.play()
      slide()
    }
  }


  return (
    <div
      style={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      width:"100%",
      // backgroundColor:"green",
    }}>
      <Play onClick={onPlay} disabled={props.disableBts}/>
      <canvas id='cv' 
        style={{
          width:"100%",
          // backgroundColor:"green",
        }}>
      </canvas>
    </div>
    // <img src={image.src} alt="not yet queried" 
    //   style={{
    //     width:"100%", //no respect of flex height
    //   }}
    // />
  )
}

SlideImg.propTypes = {
  word: PropTypes.string,
  setAudioLen: PropTypes.func,
  setDisableBts: PropTypes.func,
  disableBts: PropTypes.bool,
}

export default SlideImg
