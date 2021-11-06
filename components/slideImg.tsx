import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Play from "./utils/play"
import {server} from '../config'


const SlideImg = ({word, setAudioLen, setDisableBts, disableBts, canvasId}) => {
 
  const [image, setImage] = useState(null)
  const [audio, setAudio] = useState(null)
  const [loadedImage, setLoadedImage] = useState(false)
  const [loadedAudio, setLoadedAudio] = useState(false)

  let x = 0
  const slide = () => {
    try {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      var ctx = canvas.getContext('2d');
      
      const W = canvas.width
      const H = canvas.height
      
      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(image, 0, 0, W, H);

      x = ( (audio.currentTime === 0 )|| (audio.currentTime === undefined) ) ? 
        x+Math.round(W*0.05) : 
        Math.round(W * audio.currentTime/audio.duration)
      ctx.fillStyle = 'lightGray';
      ctx.fillRect(x, 0, W, H);
  
      if (x < W){
        window.requestAnimationFrame(()=>slide())
      }
      else{
        setDisableBts(false)
      }
      
    } catch (error) {
      console.log("Error on slide: ", error);
    }
  }
  
  useEffect(() => {
    if (!(image)){
      setImage(new Image())
    }
    console.log('0 effect default')
    console.log('image: ', image)
  }) 
  
  useEffect(() => {
    if (image) {
      image.src = `${server}/spec/${word}`
    }
    setAudio(new Audio(`${server}/audio/${word}`))
    setLoadedImage(false)
    setLoadedAudio(false)

    console.log('1 effect word')
    console.log('word: ', word)
    console.log('image: ', image)
  }, [word])

  useEffect(() => {
    if (audio){
      audio.addEventListener('loadeddata', () => {
        setLoadedAudio(true) 
        setAudioLen(audio.duration)
      })
      document.body.style.cursor='default';
    }
    if (image) {
      if(!loadedImage){
        image.src = `${server}/spec/${word}?version=1`
      }
      image.onload = () => {
        console.log('image ', word , ' loaded')
        setLoadedImage(true)
        //slide(true)
      }
    }
    console.log('2 effect image audio')
    console.log('image: ', image)
    
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
      setDisableBts(true)
      //TODO: this should be Promise, when resolved setDisableBts(false)
      audio.play()
      slide()
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
      <Play
        style={{
          position:"absolute",
          bottom:"2px",
          right:"2px",
        }}
        onClick={onPlay}
        disabled={disableBts}
      />
      <canvas id= {canvasId} 
        style={{
          width:"100%",
        }}>
      </canvas>
    </div>
  )
}

SlideImg.propTypes = {
  word: PropTypes.string,
  setAudioLen: PropTypes.func,
  setDisableBts: PropTypes.func,
  disableBts: PropTypes.bool,
}

export default SlideImg
