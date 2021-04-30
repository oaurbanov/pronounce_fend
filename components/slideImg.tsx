import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const SlideImg = props => {
 
  const [specImg, setSpecImg] = useState(null)

  var nn = 0  
  const slide = () => {
    const canvas = document.getElementById('cv') as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');

    const W = canvas.width//300
    const H = canvas.height//150

    ctx.clearRect(0,0, W, H)
    ctx.drawImage(specImg, 0, 0, W, H);

    const V = 4 // f(W, secsLengSound, frameRefreshRate)
    nn = nn+V

    const W2 = Math.round(W * 0.9)
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(nn, 0, W, H);

    // if (nn < W){
      window.requestAnimationFrame(slide)
    // }

  }
  
  useEffect(() => {
    setSpecImg(new Image())
    if (specImg) {
      specImg.src = props.imgUrl
      specImg.addEventListener( 'load', () => {
        slide()
        console.log("specImg: ", specImg)
      }, false);
    }

    return () => {
      //cleanup
    }
  }, [props.imgUrl])

  return (

    <canvas id='cv' style={{width:"100%"}}>
    </canvas>
    
    // <img src={specImg.src} alt="not yet queried" 
    //   style={{
    //     width:"100%", //no respect of flex height
    //   }}
    // />
  )
}

SlideImg.propTypes = {
  imgUrl: PropTypes.string,
}

export default SlideImg
