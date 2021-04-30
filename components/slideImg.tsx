import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import {server} from '../config'


const SlideImg = props => {
 
  const [image, setImage] = useState(null)
  const [audio, setAudio] = useState(null)

  const [loadedImage, setLoadedImage] = useState(false)
  const [loadedAudio, setLoadedAudio] = useState(false)

  const slide = () => {
    const canvas = document.getElementById('cv') as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    
    const W = canvas.width
    const H = canvas.height
    
    ctx.clearRect(0, 0, W, H)
    ctx.drawImage(image, 0, 0, W, H);

    const x = Math.round(W * audio.currentTime/audio.duration)
    ctx.fillStyle = 'lightGray';
    ctx.fillRect(x, 0, W, H);

    if (x < W){
      window.requestAnimationFrame(slide)
    }
    else{
      setLoadedImage(false)
      setLoadedAudio(false)
      props.setDisableBts(false)
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
  }, [props.word])



  useEffect(() => {
    if (audio){
      audio.addEventListener('loadeddata', () => {
        setLoadedAudio(true) 
      })
      document.body.style.cursor='default';
    }

    if (image) {
      image.onload = () => {
        setLoadedImage(true)
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

    <canvas id='cv' style={{width:"100%"}}>
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
}

export default SlideImg
