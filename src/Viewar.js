import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'



const Viewar = () => {


    
    const getbranddetails= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getbranddetails'
    const [branddetails, setBrandDetails] = useState()
     const location = useLocation()
     const history = useHistory()
     useEffect(()=>{
        const brandbody={
            brand: location.state
          }
        
          axios.post(getbranddetails, brandbody).then(res=>{
            setBrandDetails(res.data)
          
          }).catch(error=>{
            console.log(error)
          })
     },[])
     const handleclick =(item)=>{
      if(item.modelrequired === 'true'){
        history.push({
          pathname: '/details',
          state: item.product_Id
      })
       }else
        history.push({
            pathname: '/view',
            state: item
        })
     }
  

  return (
    <div>
        <div className='navbardisplay'>
            <Navbar/>
            </div>
            <div className='viewbrand'>
            <Helmet>
            <title>Products | ARnxt</title>
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
              <div className='viewar3d'>
                {
                    branddetails && branddetails.map(item=>(
                        <div>
                        <img src={item.imageurl[0]}/>
                        <div className='detailsbutton'>
                <button type='submit' onClick={()=>handleclick(item)} >View details</button>
              </div>
            
                    </div>
                    
                   
                    ))

                  
                }
               
             

            

              </div>
           
            </div>
      
    </div>
  )
}

export default Viewar
