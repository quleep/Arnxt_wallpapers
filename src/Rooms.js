import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import MultiRangeSlider from "multi-range-slider-react";
import { FaTimes } from 'react-icons/fa';


const getcatsubcaturl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getcategorysubcat'
const getallcategory= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/allcategory'
const getalldesginstyles= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/designstyles'
const getallcolors= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getcolorstable'
const getallcollections='https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getcollectiontable'
const getalltags= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/alltagstable'
const filterdataurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/filterdataroom'
const getsubcatdataurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getsubcatitems'

const getroomsdataurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getsingleroomdata'

const Rooms = () => {

    
    const [catdata, setCatData] = useState()
    const [itemdata, setItemData] = useState()
    const [subcategorydata, setSubCategoryData] = useState()
    const [designtable, setDesignTable] = useState();
    const [colortable, setColorTable] = useState();
    const [collectiontable, setCollectionTable] = useState();
    const [tagstable, setTagsTable] = useState();
    const [colorarray, setColorArray] = useState([])
    const [categoryarray, setCategoryArray] = useState('')
    const [designstylearray, setDesignStyleArray] = useState('')
    const [tagsarray, setTagsArray] = useState([])
    const [collectionarray, setCollectionArray] = useState('')
    const [minprice, setMinPrice] = useState('');
    const [maxprice, setMaxPrice] = useState('');
    const [filterTags, setFilterTags] = useState([])

    const [imageDataURL, setImageDataUrl] = useState('')

    const [filtercolor, setFilterColor] = useState([])
    const [filterdesign, setFilterDesign] = useState([])
    const [filtercollection, setFilterCollection] = useState([])

    const [filterdata, setFilterData] = useState()

    const user= sessionStorage.getItem('user')
    const brandid= JSON.parse(user)
  
    const brandidnew= brandid.brand.toLowerCase()
    const history = useHistory()

  

const location = useLocation()






let newcat;

useEffect(()=>{

 const body={
    brand: brandidnew,
    roomName: location.state
 }

 axios.post(getroomsdataurl ,body).then(res=>{
     setSubCategoryData(res.data)
    
 }).catch(error=>{
    console.log(error)
 })



   
   
},[])

if(subcategorydata === ''){
    document.querySelector('.nodata').style.display = 'block'
  }
  

const closemodal= ()=>{
    document.querySelector('.nodata').style.display= 'none'
}



const handlearview=(item)=>{
    history.push({
        pathname: '/view',
        state: item
    })
  
}

const productdetails =(item)=>{

   
    history.push({
        pathname: '/productdetails',
        state: item
    })
     
}


useEffect(()=>{
  
    axios.get(getalldesginstyles).then(res=>{
        setDesignTable(res.data)
    }).catch(error=>{
        console.log(error)
    })

    axios.get(getallcolors).then(res=>{
        setColorTable(res.data)
    }).catch(error=>{
        console.log(error)
    })

    axios.get(getallcollections).then(res=>{
        setCollectionTable(res.data)
    }).catch(error=>{
        console.log(error)
    })
    axios.get(getalltags).then(res=>{
        setTagsTable(res.data)
    }).catch(error=>{
        console.log(error)
    })




},[])


const handlefilterclear=()=>{
    setFilterData('')
      setFilterTags([])
      setFilterColor([])
      setFilterCollection([])
      setFilterDesign([])
  
      let get= document.getElementsByName('check');
  
  for(let i= 0; i<get.length; i++){
  
  get[i].checked= false;}
    
  }
  
  const handleWallpaper=(val,len)=>{
      let checked= false;
      if(document.querySelector(`#check_${len}:checked`)){
        checked = true;
      } 
      else{
        checked = false;
      }
      if(checked){
    
       
        document.querySelector(`#divselect_${len}`).style= 'border: 2px solid #94c4e0'
       
      }
    
      if(!checked){
      
    
         
        document.querySelector(`#divselect_${len}`).style= 'border: none'
    
    
      }
    
  }

   let filteredArray= []
  const handleApplyFilter=()=>{

 
    const body={
      brand: brandidnew,
      roomName: location.state,
      tagvalue: filterTags,
      colorvalue: filtercolor,
      collectionvalue: filtercollection,
      designstyle: filterdesign,
      maxprice: Number(maxprice),
      minprice: Number(minprice)
    }
  
    axios.post(filterdataurl, body).then(res=>{
      if(res.status === 200){
  
    setSubCategoryData(res.data)
  
    
      
      }
  
    }).catch(error=>{
      console.log(error)
    })
    
  
  }


  
const filterHandler = (event, val) => {
   
     
    if (event.target.checked) {

      
       
      setFilterTags([...filterTags, event.target.value])
    } else {
       
      setFilterTags(
       
        filterTags.filter((filterTag) => filterTag !== event.target.value)
      )
    }
  }
const filterColorHandler= (event)=>{

       
  if (event.target.checked) {

      
       
    setFilterColor([...filtercolor, event.target.value])
  } else {
     
    setFilterColor(
     
      filtercolor.filter((filtercolor) => filtercolor !== event.target.value)
    )
  }

}

const filterCollectionHandler= (event)=>{

         
  if (event.target.checked) {

      
       
    setFilterCollection([...filtercollection, event.target.value])
  } else {
     
    setFilterCollection(
     
      filtercollection.filter((filtercoll) => filtercoll !== event.target.value)
    )
  }

}

const filterDesignHandler = (event)=>{

  if (event.target.checked) {

      
       
    setFilterDesign([...filterdesign, event.target.value])
  } else {
     
    setFilterDesign(
     
      filterdesign.filter((filtercoll) => filtercoll !== event.target.value)
    )
  }


}

const handleInput = (e) => {

    setMinPrice(e.minValue);
    setMaxPrice(e.maxValue);

};



  return (
    <div>
            <Navbar/>

                 <div  className='mainbrandbody'>

<div  style={{marginTop:'20px'}}>
<div className='buttonfilterdiv'> 
      
      <button class="filterlink" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
Filter <i class='bx bx-filter'></i></button>
      </div>
</div>


   
<div className='nodata'> 
          <span  className='crossnodata' onClick={closemodal} ><FaTimes style={{fontSize:'20px'}} /></span>
              <h2>No Data Available</h2>

          </div>



<div  className='subcategorydiv'>




    <div  className='productscontainer'  >

     
          

        {
           subcategorydata && subcategorydata.map((item,i)=>(

         

            <div class="product-card"   >

            <div class="product-tumb">
                <img src={item.imageurl[0]} alt=""/>
            </div>

         
            <div class="product-details" >
                <span class="product-catagory"  onClick={()=>productdetails(item)}>{item.productname}</span>
                
               <span  style={{display:'flex',  alignItems:'center', justifyContent:'center'}}>
                 <p style={{marginRight:'10px'}}>Roll Size</p>
               <p>
               
                
                   
                    
                {
           
               Math.round(` ${ item.height * item.breadthprod * 10.764}`)
               
               
               } /sqft   </p>
               </span>
             
                <div class="product-bottom-details">
                    <div class="product-price"><small>₹{item.mrp}</small>₹{item.offerprice}</div>
            
                    <div className='viewinar' >
                        <button onClick={()=>handlearview(item)} >view in AR</button>
                    </div>
                </div>
            </div>

           
            
        </div>

        
     
    


           ))

       
                 }
       




    </div>


</div>






</div>


<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
<div class="offcanvas-header">
<h5 class="offcanvas-title" id="offcanvasScrollingLabel">Filter</h5>
<div className='buttonfilter'>
<button  type='submit' onClick={handlefilterclear} >Clear</button>


</div>
<div className='buttonfilter'>
<button type='submit'   onClick={handleApplyFilter}> Apply</button>


</div>


<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<div class="offcanvas-body">

<div>


<div class="accordion accordion-flush" id="accordionFlushExample">
<div class="accordion-item">
<h2 class="accordion-header" id="flush-headingOne">
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
Search By
</button>
</h2>
<div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
<div class="accordion-body">
{
 tagstable && tagstable.map(item=>(
      item.tagsvalue.map(it=>(

       

        <div className='colorlistinside'>
        <input type='checkbox' id= '' name='check'  value={it}  onChange={(e)=>filterHandler(e)}/>
        <p>{it}</p>

         </div>
      
      
      ))

 ))

   
}


</div>
</div>
</div>
<div class="accordion-item">
<h2 class="accordion-header" id="flush-headingTwo">
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
Colors
</button>
</h2>
<div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
<div class="accordion-body">
{
 colortable && colortable.map(item=>(
      item.colordata.map(it=>(

       

        <div className='colorlistinside'>
        <input type='checkbox' id= '' name='check' value={it}  onChange={(e)=>filterColorHandler(e)}/>
        <p>{it}</p>

         </div>
      
      
      ))

 ))

   
}


</div>
</div>
</div>
<div class="accordion-item">
<h2 class="accordion-header" id="flush-headingThree">
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
Design Styles
</button>
</h2>
<div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
<div class="accordion-body">
{
 designtable && designtable.map(item=>(
      item.designs.map(it=>(

       

        <div className='colorlistinside'>
        <input type='checkbox' id= '' name='check' value={it}  onChange={(e)=>filterDesignHandler(e)}/>
        <p>{it}</p>

         </div>
      
      
      ))

 ))

   
}


</div>
</div>
</div>
<div class="accordion-item">
<h2 class="accordion-header" id="flush-headingFour">
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
Collection
</button>
</h2>
<div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
<div class="accordion-body">
{
 collectiontable && collectiontable.map(item=>(
      item.collectionitems.map(it=>(

       

        <div className='colorlistinside'>
        <input type='checkbox' id= '' name='check' value={it}  onChange={(e)=>filterCollectionHandler(e)}/>
        <p>{it}</p>

         </div>
      
      
      ))

 ))

   
}

</div>
</div>
</div>
<div class="accordion-item">
<h2 class="accordion-header" id="flush-headingFive">
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
Price
</button>
</h2>
<div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
<div class="accordion-body">

<div>
                       <div>
                       <div className="range">
<MultiRangeSlider
   min={2000}
   max={60000}
   step={100}

   barInnerColor= "rgb(19, 209, 187)"
   ruler={false}
 
   onChange={(e) => {
       handleInput(e);
   }}
/>
<div className='rangeinput'>
   <label>MinPrice:</label>
<input type='number' value={minprice}  />

</div>
<div className='rangeinput'>
   <label>MaxPrice:</label>
<input type='number' value={maxprice}  />

   </div>
 


  </div>


</div>
                       </div>
</div>
</div>
</div>
</div>

















<div className='accordionContainer'>





{/*

{

accordionData &&   accordionData.map((acc, index) => {
   return (
       <div className="accordion"
          >
           <div className='accordionHeading'  onClick={() => handleActive(index)} >

               <span className="addIcon"
                   style={{
                       transform: `${accActive === index ? 'rotate(180deg)' :
                           'rotate(0deg)'}`
                   }}>
                   <RiArrowDownSLine size={25} />
               </span>
               <h3>{acc.title}</h3>
           </div>
           {
             accActive === index ? <div className="accordionContent">




{
                   acc.accordianfor === 'Category' ? 

                   
                   <div>

                       {
                           acc.accordionContent.map((item,i)=>(

                           <div className='colorlistcontainer'>

                               <div className='colorlistinside'>
                               <input type='checkbox' id= {`checkcategory_${i}`}  value={item.category}  onClick={()=>checkboxClickCategory(item.category, i)}/>
                               <p>{item.category}</p>

                                </div>
                              
                           

                           </div>


                           ))
                       }
                      


                 </div>:<div></div>

                     }

{
                   acc.accordianfor === 'tags' ? 

                 

                
                   <div  >



                       { 
                      acc.accordionContent.map(item=>(
                               item.tagsvalue.map((it, i)=>(

                                   <div className='colorlistcontainer'>

                                   <div className='colorlistinside'>
                                   <input type='checkbox' id= {`checktags_${i}`}  value={it}  onChange={(e)=>filterHandler(e, acc.accordianfor)}/>
                                   <p>{it}</p>

                                    </div>
                                  
                               

                               </div>



                               ))
                               

                       


                           ))
                               }
                      


                 </div>: <div></div>

                  }





                  {
                   acc.accordianfor === 'colorvalue' ? 

                   
                   <div>

                       {
                           acc.accordionContent.map((item)=>(
                               item.colordata.map((it,i)=>(

                                   <div className='colorlistcontainer'>

                                   <div className='colorlistinside'>
                                    <input type='checkbox' id= {`checkcolor_${i}`}  value={it}  onChange={(e)=>filterHandler(e, acc.accordianfor)}/>
                                   <p>{it}</p>

                                    </div>
                                  
                               

                               </div>

                               ))

                        


                           ))
                       }
                      


                 </div>:<div></div>

                  }



{
                   acc.accordianfor === 'Design' ? 

                   
                   <div>

                       {
                           acc.accordionContent.map((item,i)=>(

                               item.designs.map((it,i)=>(

                                   <div className='colorlistcontainer'>

                                   <div className='colorlistinside'>
                                   <input type='checkbox' id= {`check_${i}`}  value={it} onChange={filterHandler}/>
                                   <p>{it}</p>

                                    </div>
                                  
                               

                               </div>

                               ))

                          


                           ))
                       }
                      


                 </div>:<div></div>

                  }


{
                   acc.accordianfor === 'Collection' ? 

                   
                   <div>

                       {
                           acc.accordionContent.map((item)=>(

                           item.collectionitems.map((it,i)=>(
                               <div className='colorlistcontainer'>

                               <div className='colorlistinside'>
                               <input type='checkbox'  id= {`check_${i}`}  value={it}  onChange={filterHandler}/>
                               <p>{it}</p>

                                </div>
                              
                           

                           </div>

                           ))


                           ))
                       }
                      


                 </div>:<div></div>

                  }


{
                   acc.accordianfor === 'Price' ? 

                   
                   <div>
                       <div>
                       <div className="range">
<MultiRangeSlider
   min={5000}
   max={100000}
   step={5000}
   minValue={minValue}
   maxValue={maxValue}
   barInnerColor= "rgb(19, 209, 187)"
   ruler={false}
 
   onInput={(e) => {
       handleInput(e);
   }}
/>
<div className='rangeinput'>
   <label>MinPrice:</label>
<input type='number' value={minValue}/>

</div>
<div className='rangeinput'>
   <label>MaxPrice:</label>
<input type='number' value={maxValue}/>

   </div>





</div>
                       </div>




                 </div>:<div></div>

                  }




                  
               </div> : <div></div>
           }



             
       </div>
   )
})
}

*/}
</div>

</div>

</div>
</div>
        
      
    </div>
  )
}

export default Rooms
