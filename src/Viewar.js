import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'



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
