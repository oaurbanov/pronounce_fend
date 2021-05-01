import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Play from "./utils/play"
import {server} from '../config'


const SlideImg = (props) => {
 
  const [image, setImage] = useState(null)
  const [audio, setAudio] = useState(null)
  const [loadedImage, setLoadedImage] = useState(false)
  const [loadedAudio, setLoadedAudio] = useState(false)
  const [userInteract, setUserInteract] = useState(false)

  let x = 0
  const slide = (muted=false) => {
    try {
      const canvas = document.getElementById('cv') as HTMLCanvasElement;
      var ctx = canvas.getContext('2d');
      
      const W = canvas.width
      const H = canvas.height
      
      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(image, 0, 0, W, H);
  
      x = (muted) ? 
        x+Math.round(W*0.05) : 
        Math.round(W * audio.currentTime/audio.duration)
      ctx.fillStyle = 'lightGray';
      ctx.fillRect(x, 0, W, H);
  
      if (x < W){
        window.requestAnimationFrame(()=>slide(muted))
      }
      else{
        setLoadedImage(false)
        setLoadedAudio(false)
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
    //Avoid error: user didn't interact with document first
    document.body.onclick = () => setUserInteract(true)
  }) 
  
  useEffect(() => {
    if (userInteract) {
      if (image) {
        image.src = `${server}/spec/${props.word}`
      }
      setAudio(new Audio(`${server}/audio/${props.word}`))
    }
    else {
      if (image) {
        image.src = `${server}/spec/${props.word}`
      }
    }
  }, [props.word, userInteract])



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
        if (!userInteract){
          slide(true)
        }
      }
    }
    
  }, [audio, image])
  
  useEffect(() => {
    if(loadedImage && loadedAudio){
      audio.play()
      slide()
    }
  }, [loadedImage, loadedAudio])


  return (

    <canvas id='cv' 
      style={{
        width:"100%",
        // backgroundColor:"green",
      }}>
    </canvas>
    
    // <img src={image.src} alt="not yet queried" 
    //   style={{
    //     width:"100%", //no respect of flex height
    //   }}
    // />
  )
}

SlideImg.propTypes = {
  word: PropTypes.string,
  setDisableBts: PropTypes.func,
  setAudioLen: PropTypes.func,
}

export default SlideImg
