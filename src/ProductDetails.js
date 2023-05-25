import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'

const ProductDetails = () => {

    const location = useLocation()

    const [itemdetails, setItemDetails] = useState()
useEffect(()=>{
    setItemDetails(location.state)

},[])


  return (
    <div>
        <Navbar/>

       <div className='productdetailsdiv'>
        <div className='productimagecontainer'>

            <div className='productimagedivinside'>
            <img src= {itemdetails && itemdetails.imageurl[0]}/>


            </div>

        </div>
        <div className='productdetailscontainer'>
            <div>
                <div className='itemnamediv'>
                <h2>{itemdetails && itemdetails.productname }</h2>


                </div>
            </div>
            <div>
                <div className='specificationdiv'>
                <p>{itemdetails && itemdetails.Specification}</p>


                </div>
            </div>
            <div>  
                <div className='mrpdiv'>
                <label>MRP</label>
                <p>{itemdetails && itemdetails.mrp}</p>

                </div>
              
            </div>
            <div>
            <div className='mrpdiv'>
                <label>OFFER PRICE</label>
                <p>{itemdetails && itemdetails.offerprice}</p>

                </div>
            </div>
            <div>
                <div className='mrpdiv'>
            <label>DIMENSION</label>
                <p>  {Math.round(` ${ itemdetails && itemdetails.height * itemdetails.breadthprod * 10.764}`)}/sqft</p>

                </div>

            </div>



        </div>
         
       </div>
        
    
    </div>
  )
}

export default ProductDetails
