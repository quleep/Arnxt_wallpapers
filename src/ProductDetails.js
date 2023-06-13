import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import aricon from '../src/images/image (2).png';


const ProductDetails = () => {

      const history = useHistory()
    const user= sessionStorage.getItem('user')

    if(!user){
        history.push('/')
    }

    const location = useLocation()

    const [itemdetails, setItemDetails] = useState()
useEffect(()=>{
    setItemDetails(location.state)

},[])

useEffect(() => {
    function handleContextMenu(e) {
      e.preventDefault(); 
    }
   
    const rootElement = document.getElementById('my-component');
    rootElement.addEventListener('contextmenu', handleContextMenu);
   
  
    return () => {
      rootElement.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const handlearview= (item)=>{
    history.push({
        pathname: '/view',
        state: item
    })
  }
  return (
    <div>
        <Navbar/>

       <div className='productdetailsdiv'id='my-component' >
        <div className='productimagecontainer'>

            <div className='productimagedivinside'>
            <img src= {itemdetails && itemdetails.imageurl[0]}/>
            <div className='viewinar' style={{marginTop:'10px'}} >
                                <button onClick={(e)=>handlearview(itemdetails)} > View in AR <span className='ariconviewinar'><img src={aricon}/></span></button>
                            </div>

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
                <p>  {Math.round(` ${ itemdetails && itemdetails.height * itemdetails.breadthprod * 10.764}`)} sqft</p>

                </div>

            </div>



        </div>
         
       </div>
        
    
    </div>
  )
}

export default ProductDetails
