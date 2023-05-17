import React, { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './Navbar'
import { RiAddLine, RiArrowDownSLine } from 'react-icons/ri';
import axios from 'axios';
import { MdKeyboardArrowDown } from 'react-icons/md';

import MultiRangeSlider from "multi-range-slider-react";

import checked from '../src/Assets/checked.svg'
import unChecked from '../src/Assets/unchecked.svg'
import { useHistory, useLocation } from 'react-router-dom';

const categoryimageurl= 'https://api.arnxt.com/model/allcategories'

const getcatsubcaturl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getcategorysubcat'


const collectionurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/arnxtprodapi/collection'
const gettagsurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/arnxtprodapi/tags/new'
const getcategoryurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/arnxtprodapi/category'
const getdesignstyleurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/arnxtprodapi/designstyles'
const getcolorsurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/arnxtprodapi/color'

const getallcategory= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/allcategory'
const getalldesginstyles= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/designstyles'
const getallcolors= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getcolorstable'
const getallcollections='https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getcollectiontable'
const getalltags= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/alltagstable'

const Brand = () => {

    const [minprice, setMinPrice] = useState('');
    const [maxprice, setMaxPrice] = useState('');
    const [categorytable, setCategoryTable] = useState();
    const [designtable, setDesignTable] = useState();
    const [colortable, setColorTable] = useState();
    const [collectiontable, setCollectionTable] = useState();
    const [tagstable, setTagsTable] = useState();

    const [searchvalue, setSearchValue] = useState(false)


    const [colorarray, setColorArray] = useState([])
    const [categoryarray, setCategoryArray] = useState('')
    const [designstylearray, setDesignStyleArray] = useState('')
    const [tagsarray, setTagsArray] = useState([])
    const [collectionarray, setCollectionArray] = useState('')

    const [categoryimages, setCategoryImages] = useState()

    const [itemselected, setItemSelected] = useState();
    const [catdata, setCatData] = useState()

    const [subcategorydata, setSubCategoryData] = useState()
    const [filterTags, setFilterTags] = useState([])

    const history= useHistory()

    const ref= useRef()


   



    const handleInput = (e) => {

        setMinPrice(e.minValue);
        setMaxPrice(e.maxValue);

   };

   


 

    const user= sessionStorage.getItem('user')
    const brandid= JSON.parse(user)
  
    const brandidnew= brandid.brand.toLowerCase()

    const [accActive, setAccActive] = useState(false)


    let accordionData = [

    

        {
            title: "Search By",
            accordianfor: 'tags',
            accordionContent: tagstable
        },
        
        
        
        {
        title: "Colors",
        accordianfor: 'colorvalue',
        accordionContent:  colortable
    },
    {
        title: "Design Styles",
        accordianfor: 'Design',
        accordionContent:  designtable
    },
    {
        title: "Collections",
        accordianfor: 'Collection',
        accordionContent: collectiontable
    },
    {
        title: "Price",
        accordianfor: 'Price',
       
    },
    ]
    const handleActive = (index) => {
       

        if (accActive === index) {
            setAccActive()
        }
        else {
            setAccActive(index)
        }
    }


   

const checkboxClick=(val, len)=>{
    let checked = false

    if(document.querySelector(`#check_${len}:checked`)){
        checked = true;
      } 
      else{
        checked = false;
      }

      if(checked){
        setCollectionArray(val)
      }
      if(!checked){
        setCollectionArray('')
      }

}



const checkboxClickDesign=(val, len)=>{
    let checked = false

    if(document.querySelector(`#check_${len}:checked`)){
        checked = true;
      } 
      else{
        checked = false;
      }

      if(checked){
        setDesignStyleArray(val)
      
      
      }
      if(!checked){
        setDesignStyleArray('')
      }

}


const checkboxClickColor=(val, len)=>{
    let checked = false

    if(document.querySelector(`#checkcolor_${len}:checked`)){
        checked = true;
      } 
      else{
        checked = false;
      }

      if(checked){
       setColorArray([...colorarray, val])
      }

      if(!checked){
        
    setColorArray((oldArray)=>oldArray.filter((item)=>
   
    item != val
      ))
      }

}

const checkboxClickTags=(val, len)=>{

    let checked = false

    if(document.querySelector(`#checktags_${len}:checked`)){
        checked = true;
      } 
      else{
        checked = false;
      }

      if(checked){
       setTagsArray([...tagsarray, val])
      }

      if(!checked){
        
    setTagsArray((oldArray)=>oldArray.filter((item)=>
   
    item != val
      ))
      }





}




const checkboxClickCategory=(val, len)=>{
    let checked = false

    if(document.querySelector(`#checkcategory_${len}:checked`)){
        checked = true;
      } 
      else{
        checked = false;
      }

      if(checked){
       setCategoryArray(val)
      }

      if(!checked){
        
    setCategoryArray('')
   
      }
      

}


useEffect(()=>{
    axios.get(categoryimageurl).then(res=>{
        setCategoryImages(res.data)
    }).catch(error=>{
        console.log(error)
    })
},[])


useEffect(()=>{

    const body={
        brand: brandidnew,
         collection: collectionarray
    }

    axios.post(collectionurl, body).then(res=>{
       
    }).catch(error=>{
        console.log(error)
    })
},[collectionarray])

useEffect(()=>{

    const body={
        brand: brandidnew,
         design: designstylearray
    }

    axios.post(getdesignstyleurl, body).then(res=>{
       
    }).catch(error=>{
        console.log(error)
    })
},[designstylearray])


useEffect(()=>{

    const body={
        brand: brandidnew,
        tagsvalue: tagsarray
    }

    axios.post(gettagsurl, body).then(res=>{
       
    }).catch(error=>{
        console.log(error)
    })

},[tagsarray])


useEffect(()=>{

    const body={
        brand: brandidnew,
        category: categoryarray
    }

    axios.post(getcategoryurl, body).then(res=>{
      
    }).catch(error=>{
        console.log(error)
    })

},[categoryarray])


useEffect(()=>{

    const body={
        brand: brandidnew,
        colorsvalue: colorarray
    }

    axios.post(getcolorsurl, body).then(res=>{
      
    }).catch(error=>{
        console.log(error)
    })

},[colorarray])




useEffect(()=>{
    axios.get(getallcategory).then(res=>{
        setCategoryTable(res.data)

    }).catch(error=>{
        console.log(error)
    })

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

{

  /*

       categoryimages && categoryimages.data.map((item,i)=>(

   <div>
                    <img src={item.iconUrl} style={{height:'150px', width:'150px'}} />  

                    <p>{item.catagoryId}</p>
      
                   </div>

                    


                    ))
  */  
}


const checkboxClickHomediv=(val,len)=>{

}




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

function removerepeat(data){
  return [...new Set(data)]
}


let catarr=[]


catdata && catdata.map(item=>{
    if(catarr.includes(item.category)){

    }else{
        catarr = [...catarr]
        catarr.push(item.category)
    }

  
    
})

let subcatarr= []

catdata && catdata.map(item=>{
    if(subcatarr.includes(item.subcategory)){

    }else{
        subcatarr = [... subcatarr]
        subcatarr.push(item.subcategory)
    }

  
    
})

let newcat;

const handlesubcategory=(item)=>{

    history.push({
        pathname: `/${item}`,
        state: item
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
  let filteredDATA


 

  
 

  const filterdata = (catitems, filterarray)=>{
    const filterfinaldata= []

    if( catitems && catitems.length > 0  && filterTags.length > 0){

        for( const item of catitems){
            for (const itemnew of filterarray){
             
            
            
          
             if(filterarray.every((it)=> item.collection === it  ||  item.designstyle === it ||
                item.colorvalue.includes(it) || item.tags.includes(it) ||

                 item.mrp > it.minvalue || item.mrp < it.maxvalue
               
              
              ) 
              
              
              ){

                if(!filterfinaldata.includes(item)){
                  filterfinaldata.push(item)

                }
                
              }
              
              
              
      
            }
      
          }
         

    }

  
    return filterfinaldata
   
     
  }



const filterproduct= filterdata(catdata, filterTags)
 


  
console.log(filterproduct)

let pricevalue; 

const handlepricebutton=()=>{


  
   
     
     setFilterTags([...filterTags, {minvalue: minprice}, {maxvalue : maxprice}])
    



}



const handlefilterclear=()=>{
    setFilterTags([])

    let get= document.getElementsByName('check');

for(let i= 0; i<get.length; i++){

get[i].checked= false;}
  
}
 
  return (
    <div>

        <Navbar/>


        <div  className='mainbrandbody'>

    
     
           

            <div  className='filtercontainer'>

            <a class="filterlink" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                Filter <i class='bx bx-filter'></i></a>
           

              </div>

            <div className='categorydiv' >
                {
                    catarr.map(item=>(
                        <p>{item}</p>
                    ))
                }
            </div>
            <div  className='subcategorydiv'>

              
                        <div  className='subcatimagediv'>

                            {
                                subcatarr.map((item,i)=>(
                                    <div>
                                        <p onClick={()=>handlesubcategory(item)} >{item}</p>

                                    </div>

                                ))
                            }
                           
                            <div></div>
                            <div></div>
                            
                           


                        </div>

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

              <div className='categorycontainer'  style={{display:'none'}}>

                {


                 categoryimages && categoryimages.data.filter((item,index)=> index === index).map((newitems,i)=>(


          <div  id={`divselect_${i}`}  style={{border:'1px solid red'}} >

<label htmlFor= {`check_${i}`}>

  <div className='checkboxmain' >
<input type='checkbox'   className='checkinput' id= {`check_${i}`} value={newitems} onClick={()=>checkboxClickHomediv(newitems,i)} />

<div className='imagedivcontainer' >
<img src={newitems.iconUrl} width='150px' height='150px'/>



</div>
<div className='modelnamecontainer'> 

<p>{newitems.catagoryId}</p>

</div>


  </div>



</label>


 </div>
                       )  )


}

                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
               
                
             
           
       
           

        
               
             

      
              </div>
            



        </div>


           <div  className=''>

          
       

        </div>

             
      

<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Filter</h5>
    <button  type='submit' onClick={handlefilterclear} >Clear</button>


    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">

  <div >


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
                <input type='checkbox' id= '' name='check' value={it}  onChange={(e)=>filterHandler(e)}/>
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
                <input type='checkbox' id= '' name='check' value={it}  onChange={(e)=>filterHandler(e)}/>
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
                <input type='checkbox' id= '' name='check' value={it}  onChange={(e)=>filterHandler(e)}/>
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
           min={5000}
           max={60000}
           step={3000}
       
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
           <div className='rangeinput'>
            <button  type='submit' onClick={handlepricebutton} >Go</button>

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

export default Brand
