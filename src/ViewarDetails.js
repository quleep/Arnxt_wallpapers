import React from 'react'
import Navbar from './Navbar'
import { useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import QRCode from "react-qr-code";
import { Helmet } from 'react-helmet';




const ViewarDetails = () => {

  const user= sessionStorage.getItem('user')
    


  
  let brandidnew;
  let brandid
  let userdata
  if(user && user.includes('data')){
     userdata= JSON.parse(user)
      userdata = userdata.data.userID
   
  }
  
  if(user && !user.includes('data')){
     userdata = user
  }


    
    const location = useLocation()
    const itemdetails= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getsingleitemdetails'
    const [glburl, setGlbUrl] = useState()

    const modelRef =  useRef();
     useEffect(()=>{
        axios.post(itemdetails, location.state).then(res=>{
          setGlbUrl(res.data)
        }).catch(error=>{
            console.log(error)
        })
     },[])

 
     console.log(glburl && glburl.productdetails)  
  return (
    <div>
          <div className='navbardisplay'>
            <Navbar/>
            </div>
            <div  className='modelviewer' >
            <Helmet>
            <title>Visualiser | ARnxt</title>
            <meta
              name="description"
              content="India’s first Augmented reality market place where the company’s stand-out feature is its DIY(Do-It-Yourself) features."
            />
            <meta
              name="keywords"
              content="
          
          Augmented Reality, Augmented Reality in India, Augmented Reality Technology, Augmented reality product, Augmented reality app, Augmented reality apps, Augmented reality product for business, Augmented reality products for business, Augmented reality product for businesses, Augmented reality products for businesses, Augmented reality apps for android, Augmented reality app for android, Augmented reality apps for ios, Augmented reality app for ios, Augmented reality market place, Metaverse, metaverse technologies, ar technology, AR Technology, AR Technology in India, augmented realty app in India, Augmented Reality Technology App, Augmented Reality Technology App in India, augmented reality, metaverse technologies, metaverse technology, experiential commerce platform, Virtual Realty, Virtual Technology, Festive Metaverse Universe
           "
            />
          </Helmet>
       
            <div className='viewar' >

            <div className='viewercontainer'>
            <model-viewer
           
             src= { glburl && glburl.modeldetails[0].glb}
                    
                    modes="scene-viewer quick-look webxr"
                     autoplay
                     ar-placement = {glburl && glburl.productdetails[0].placement}
                    auto-rotate ar
                    camera-controls
                    shadow-intensity="1"
                ref={modelRef.current}
                style={{width:'100%', height:'100%'}}
                
             >
             
             </model-viewer>
            </div>
          

            </div>

           



<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Scan QR code</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <QRCode value= {`brand.arnxt.com/arview?id=${location.state}&user=${userdata}`}/>
          
      </div>
      <div class="modal-footer">
      <p >Scan the QR code with your mobile device to view the product in your space.</p>
        
      </div>
    </div>
  </div>
</div>

            <div  className='itemdetailsdiv'>
               <div>
                <div className='productdetails'>
                <label>Product name:</label>
                <p>{glburl && glburl.productdetails[0].productname}</p>
                </div>
                <div className='productdetails'>
                <label>Price:</label>
                <p>{`₹ ${glburl && glburl.productdetails[0].mrp}`}</p>
                </div>
                <div className='productdetails'>
                <label>Dimension:</label>
                <p>{`${glburl && glburl.productdetails[0].lengthprod} * ${glburl && glburl.productdetails[0].breadthprod} * ${glburl && glburl.productdetails[0].height} (L*B*H) `}</p>
                </div>
                <div className='productdetails'>
                <label>Unit:</label>
                <p>{glburl && glburl.productdetails[0].unit}</p>
                </div>
                <div className='productdetails'>
                <label>Details:</label>
                <p>{glburl && glburl.productdetails[0].specification}</p>
                </div>
             
                <div className='productdetails'>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                AR QR code
               </button>
       
                </div>
             
             
               </div>
              

            </div>
           
          </div>

      
    </div>
  )
}

export default ViewarDetails
