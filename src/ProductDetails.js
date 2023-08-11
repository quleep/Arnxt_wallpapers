import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import aricon from '../src/images/image (2).png';
import { Helmet } from 'react-helmet'


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
            <Helmet>
            <title>Product details | ARnxt</title>
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
                <p>{itemdetails && itemdetails.specification}</p>


                </div>
            </div>
            <div>  
                <div className='mrpdiv'>
                <label>MRP:</label>
                <p> ₹ { itemdetails && itemdetails.mrp}</p>

                </div>
              
            </div>
            <div>
            <div className='mrpdiv'>
                <label>OFFER PRICE:</label>
                <p>  ₹  {itemdetails && itemdetails.offerprice}</p>

                </div>
            </div>
            <div>
                <div className='mrpdiv'>
            <label>DIMENSION:</label>
            <p> {`${itemdetails && itemdetails.lengthprod} * ${itemdetails && itemdetails.breadthprod} * ${ itemdetails && itemdetails.height} (L*B*H) `} </p>

                </div>
                <div className='mrpdiv'>
            <label>UNIT:</label>
            <p> {itemdetails && itemdetails.unit} </p>

                </div>

            </div>



        </div>
         
       </div>
        
    
    </div>
  )
}

export default ProductDetails
