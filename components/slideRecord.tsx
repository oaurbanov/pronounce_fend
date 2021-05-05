import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Record from "./utils/record"

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

declare var MediaRecorder: any;
const recordAudio = () =>
  new Promise( async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }

    const start = () => mediaRecorder.start()
    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          // Stop streaming
          stream.getTracks().forEach( (track) => {
            if (track.readyState == 'live' && track.kind === 'audio') {
                track.stop();
            }
          });
          if (audioChunks[0].size > 0){
            console.log('stoping')
            const audioBlob = new Blob(audioChunks)
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            const play = () => audio.play()
            resolve({ audioBlob, audioUrl, play})
          } else {
            resolve(undefined)
          }
        });
        mediaRecorder.stop()
      });

    resolve({start, stop, stream})
});

// Get AudioContext singleton
let audioCtx = null;
let analyserNode = null;

// let melLog = (f) => 2595*Math.log10(1+(f/700));
let melLog = (f) => 2595*Math.log10(1+f/20);

function paintOnCanvas(stream, audioLen){

  
  const audioSourceNode = audioCtx.createMediaStreamSource(stream);
  audioSourceNode.connect(analyserNode)
  analyserNode.connect(audioCtx.destination)
  
  // 2. get FTT
  var fft_size = 4096// 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768
  analyserNode.fftsize = fft_size
  const ffts = new Uint8Array(analyserNode.frequencyBinCount); //fft in binary
  
  //5. paint column for this freqs
  const MIC_CALIBRATION = 1 //should be 1 for a good microphone
  const KEEP_FREQS = 1//0.7282*MIC_CALIBRATION // 0.1 first 10% of spectrum = 0-2k
  const LEN = ffts.length * KEEP_FREQS; // 1024 *0.5 = 512
  
  var x = 0 
  var sr = audioCtx.sampleRate//44100 //Fmax = 44k100/2 = 22 kHz
  var sr_f = sr/fft_size
  
  var h = 0
  var hMax =  melLog(LEN*sr_f)
  
  const canvas = document.getElementById('cv2') as HTMLCanvasElement;
  var ctx2 = canvas.getContext('2d');
  const W2 = canvas.width//300
  const H2 = canvas.height
  //Velocity in X for painting specto, manually adjusted
  var delta_x = Math.round(0.012*W2/audioLen) //0.012
  
  function loop() {

    let streamEnded = true
    stream.getTracks().forEach( (track) => {
      if (track.readyState != 'ended' && track.kind === 'audio') {
          streamEnded = false
      }
    });
    if (!streamEnded){
      window.requestAnimationFrame(loop);
    }


    // // 3.  get actual image, clear canvas and put image slided
    // let imgData = CTX.getImageData(1, 0, W - 1, H2);
    // CTX.fillRect(0, 0, W, H2);
    // CTX.putImageData(imgData, 0, 0);

    // 4. paint next row      
    analyserNode.getByteFrequencyData(ffts); // fft in bytes
    for (let i = 0; i < LEN; i++) {
      let rat = ffts[i] / 255;
      let hue = Math.round( 300 - (rat*360));
      let sat = '100%';
      let lit = 5 + (70 * rat) + '%'; // 10-80 %

      var last_h = h
      h =  (melLog(i*sr_f)/hMax)*(H2-1) //(value between 0 and H-1
      ctx2.fillStyle = `hsl(${hue}, ${sat}, ${lit})`;
      ctx2.fillRect(x, H2-last_h, (x)- x+delta_x, (H2-last_h)- H2-h )
    }
    x += delta_x
    if (x >= W2) 
      x=0
  }
  loop();
}


const SlideRecord = (props) => {

  let recorder = undefined
  
  let evRecStart=true
  const handleRecStart = async () => {
    if((!recorder) && evRecStart){
      evRecStart=false
      if (audioCtx == null){
        audioCtx = new (window.AudioContext)();
        analyserNode = audioCtx.createAnalyser();
        // analyserNode.minDecibels = -90;
        // analyserNode.maxDecibels = -10;
        // analyserNode.smoothingTimeConstant = 0.85;
      }
      recorder = await recordAudio()
      //painting good, not blocking call :)
      paintOnCanvas(recorder.stream, props.audioLen)
      recorder.start()
      evRecStart=true
    }
  }

  let evRecEnd=true
  const handleRecEnd = async () => {
    if (recorder && evRecEnd){
      evRecEnd=false
      const audio = await recorder.stop()
      recorder = void
  
      props.setDisableBts(true)
      console.log("audio: ", audio)
      await sleep(1000)
      if (audio !== undefined){
        //TODO: instead of play, send to the backend
        //      cut last audioLen, intelligent where specto match is stronger
        //      send specto to frontend
        audio.play()
      }
      await sleep(1000)
      props.setDisableBts(false)
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
        disabled={props.disableBts}
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
