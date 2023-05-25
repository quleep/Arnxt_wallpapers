import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'

const getcatsubcaturl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getcategorysubcat'

const Floors = () => {
    const [catdata, setCatData] = useState()
    const [itemdata, setItemData] = useState()
    const [subcategorydata, setSubCategoryData] = useState()

    const user= sessionStorage.getItem('user')
    const brandid= JSON.parse(user)
  
    const brandidnew= brandid.brand.toLowerCase()

    useEffect(()=>{
        const body={
            brand: brandidnew
        }
        axios.post(getcatsubcaturl, body).then(res=>{
           setCatData(res.data)
        }).catch(error=>{
            console.log(error)
        })
    },[])

const location = useLocation()






let newcat;

useEffect(()=>{

     setCat()

},[catdata])

const setCat=()=>{


    

    setSubCategoryData('')
    newcat= catdata && catdata.filter(itemnew=>{
       return itemnew.subcategory === location.state
   })
   
setSubCategoryData(newcat)
   
   
}


  return (
    <div>
                 <Navbar/>

          
<div  className='mainbrandbody'>


   




<div  className='subcategorydiv'>




    <div  className='productscontainer'>

        {
           subcategorydata && subcategorydata.map(item=>(

         

            <div class="product-card">

            <div class="product-tumb">
                <img src={item.imageurl[0]} alt=""/>
            </div>
            <div class="product-details">
                <span class="product-catagory">{item.productname}</span>
                
               <span  style={{display:'flex',  alignItems:'center', justifyContent:'center'}}>
                 <p style={{marginRight:'10px'}}>Roll Size</p>
               <p>
               
                
                   
                    
                {
           
               Math.round(` ${ item.lengthprod * item.breadthprod * 10.764}`)
               
               
               } /sqft   </p>
               </span>
             
                <div class="product-bottom-details">
                    <div class="product-price"><small>₹{item.mrp}</small>₹{item.offerprice}</div>
                    <div class="product-links">
                        <a href=""><i class="fa fa-heart"></i></a>
                        <a href=""><i class="fa fa-shopping-cart"></i></a>
                    </div>
                </div>
            </div>
        </div>
     
                 


           ))

        }
       

    


    </div>


</div>






</div>
      
    </div>
  )
}

export default Floors
