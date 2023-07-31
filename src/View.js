import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const View = () => {
    const modelRef =  useRef();
    const itemdetails= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getsingleitemdetails'
    const params= new URLSearchParams(window.location.search)
    const pid= params.get('id')
    const [glburl, setGlbUrl] = useState()
    
    useEffect(()=>{
        axios.post(itemdetails, pid ).then(res=>{
            
         setGlbUrl(res.data)
        }).catch(error=>{
            console.log(error)
        })
     },[])


     
  return (
    <div>
      
      <div className='viewcontainer'>
        <div className='modalcontainerar'>
            <model-viewer
              
           src= {glburl && glburl.modeldetails[0].glb}
           ios-src = {glburl && glburl.modeldetails[0].usdz}
                  
                  modes="scene-viewer quick-look webxr"
                   ar ar-scale = "fixed"
                   environment-image="neutral"
                  camera-controls touch-action="pan-y"
                  
                  shadow-intensity="1"
                  crossorigin="anonymous" 
               
              ref={modelRef.current}
              style={{width:'100%', height:'100%',padding:'10px'}}
              
           >
               <button slot="ar-button" id="ar-button">
            View in your space
          </button>
  
          <div id="ar-prompt">
            <img src="https://cdn.glitch.global/66a9aadc-16d1-4ae0-b613-4d181051d3c1/ar_hand_prompt.png?v=1680846318449"/>
          </div>
  
          <button id="ar-failure">
            AR is not tracking!
          </button>
  
           </model-viewer>

            </div>

        </div>
    </div>
  )
}

export default View
