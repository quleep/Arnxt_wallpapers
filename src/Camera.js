import React from 'react'
import Webcam from 'react-webcam'
import { useRef } from 'react'

const Camera = () => {

    const webref= useRef(null)
  return (
    <div>
        <Webcam ref={webref} />
      
    </div>
  )
}

export default Camera
