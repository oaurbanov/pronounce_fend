import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Play from "./utils/play"
import {server} from '../config'


    
const SlideImg = ({word, setAudioLen, setDisableBts, disableBts, canvasId}) => {
 
  var [image, setImage] = useState(null)
  var [audio, setAudio] = useState(null)
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
        x = 0
        setDisableBts(false)
      }
      
    } catch (error) {
      console.log("Error on slide: ", error);
    }
  }

  // non-cached query
  const loadImage = (wordy) => {
    if(wordy == ''){
      return
    }
    
    let path = `${server}/spec/${wordy}`
    var myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    
    var myInit = {
      method: 'GET',
      headers: myHeaders,
    };
    
    console.log('loadImage on path: ', path)
    var myRequest = new Request(path);
    
    fetch(myRequest, myInit)
    .then(function(response) {
        return response.blob();
      })
      .then(function(response) {
        var objectURL = URL.createObjectURL(response);
        image.onload = () => {
          setImage(image)
          setLoadedImage(true)
        }
        image.src = objectURL;
      });
  }
  
  // non-cached query
  const loadAudio = (wordy) => {
    if(wordy == ''){
      return
    }

    let path = `${server}/audio/${wordy}`
    var myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');

    var myInit = {
      method: 'GET',
      headers: myHeaders,
    };

    console.log('loadAudio on path: ', path)
    var myRequest = new Request(path);

    fetch(myRequest, myInit)
      .then(function(response) {
        // response.body is a readable stream.
        // Calling getReader() gives us exclusive access to
        // the stream's content
        var reader = response.body.getReader();
        // read() returns a promise that resolves
        // when a value has been received
        return reader
        .read()
        .then((result) => {
          return result;
        });
      })
      .then(function(response) {
        var blob = new Blob([response.value], { type: 'audio/wav' });
        var url = window.URL.createObjectURL(blob)
        audio.addEventListener('loadeddata', () => { //canplaythrough
          setAudio(audio)
          setAudioLen(audio.duration)
          setLoadedAudio(true)
        })
        audio.src = url;
        document.body.style.cursor='default';
      });
  }


  useEffect(() => {
    if (! image){
      image = new Image()
    }
    if (!audio){
      audio = new Audio()
    }
  }) 
  
  useEffect(() => {
    setLoadedImage(false)
    loadImage(word)

    setLoadedAudio(false)
    loadAudio(word)
  }, [word])



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
      audio.play() //TODO: handle exc: user has not interact
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
