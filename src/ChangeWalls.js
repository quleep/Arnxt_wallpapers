import React, { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './Navbar'
import { RiAddLine, RiArrowDownSLine } from 'react-icons/ri';
import axios from 'axios';
import Webcam from 'react-webcam'

import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaCamera, FaTimes } from 'react-icons/fa';

import MultiRangeSlider from "multi-range-slider-react";

import checked from '../src/Assets/checked.svg'
import unChecked from '../src/Assets/unchecked.svg'
import { useHistory, useLocation } from 'react-router-dom';

const filterdataurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/filterdata'

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


const ChangeWalls = () => {

    const [minprice, setMinPrice] = useState('');
    const [maxprice, setMaxPrice] = useState('');
    const [categorytable, setCategoryTable] = useState();
    const [designtable, setDesignTable] = useState();
    const [colortable, setColorTable] = useState();
    const [collectiontable, setCollectionTable] = useState();
    const [tagstable, setTagsTable] = useState();

    const [searchvalue, setSearchValue] = useState(false)
    const [cameraonstatus, setCameraOnStatus] = useState(false);
    const [camera, setCamera] = useState();
    const [file, setFile] = useState();


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

    const [imageDataURL, setImageDataUrl] = useState('')

    const [filtercolor, setFilterColor] = useState([])
    const [filterdesign, setFilterDesign] = useState([])
    const [filtercollection, setFilterCollection] = useState([])

    const [filterdata, setFilterData] = useState()
    const [imageurl, setImageUrl] = useState([])

    const [imageurlfinal, setImageUrlFinal] = useState([])
    const [fileexist, setFileExist] = useState(false)
    const [clickpicture, setClickPicture] = useState(false)
   const [distancewall, setDistanceWall] = useState('')

   const [singleitem, setSingleItem] = useState()

   const [mobileimage, setMobileImage] = useState([])

   const [checked, setChecked] = useState(false)

   const [walldistancedesk, setWallDistanceDesk] = useState('')
   const [walldistancemob, setWallDistanceMob] = useState('')


   const location = useLocation()

    const history= useHistory()



    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);


   useEffect(()=>{
    if(location.state){
      setSingleItem(location.state)
    }

   },[])

 

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


 let dis = '5'

 const checkboxSingle=(val)=>{
 
  let checked = false


  if(document.querySelector('#checksingle:checked')){
    checked = true;
  } 
  else{
    checked = false;
  }

  if(checked){
   

    if(walldistancedesk === ''){
      document.querySelector('.distancefield').style = 'border: 2px solid red'
      document.querySelector('.distanceerror').innerHTML = 'Required'
      setTimeout(() => {

      document.querySelector('.distanceerror').innerHTML = ''
        
      }, [3000]);
document.querySelector('.loadwebardesk').style.display= 'none'


      return
  } 
  else{
    document.querySelector('.distancefield').style = 'border: none'

  }

  document.querySelector('.loadwebardesk').style.display= 'block'

    setImageUrlFinal('')
   


    
    const body={
      image: imageurl[0],
      distance: walldistancedesk,
      url:  val.imageurl[0]
     
    }
  
    axios.post('http://13.233.124.197:5000/segment', body).then(res=>{

    if(res){
  document.querySelector('.loadwebardesk').style.display= 'none'

  document.querySelector('.defaultimagedesk').style.display = 'none'
  document.querySelector('.processimagedesk').style.display = 'block'



    }
      
       setImageUrlFinal( res.data.segmented_image_url)

       
  
    }).catch(error =>{
      console.log(error)
    })

  }
  if(!checked){
    setCollectionArray('')
   
    document.querySelector('#divsingle').style= 'border: none'

  }

 



 }

 

 let mobilelen= '5'



 const checkboxClickMobile=(val, len)=>{

  console.log(val)
 
  let checked = false
 

 

  if(document.querySelector(`#check_${len}:checked`)){
    checked = true;
  } 
  else{
    checked = false;
  }

  if(checked){
  document.querySelector('.loadwebar').style.display= 'block'

  
   


     document.querySelector(`#divselect_${len}`).style= 'border: 2px solid #2e6180'
    const body={
      image: mobileimage[0],
      distance: mobilelen,
      url:  val.imageurl[0]
     
    }
  
    axios.post('http://13.233.124.197:5000/segment', body).then(res=>{

    if(res){
  document.querySelector('.loadwebar').style.display= 'none'
  document.querySelector('.defaultimage').style.display = 'none'
  document.querySelector('.processimage').style.display = 'block'



    }
        setImageUrl(res.data.segmented_image_url)

        

   
       

      
     
  
    }).catch(error =>{
      console.log(error)
    })

  }
  if(!checked){
    setCollectionArray('')
    document.querySelector(`#divselect_${len}`).style= 'border: none'
  

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
      document.querySelector(`#divselect_${len}`).style= 'border: 2px solid #2e6180'
      
      if(walldistancedesk === ''){
          document.querySelector('.distancefield').style = 'border: 2px solid red'
          document.querySelector('.distanceerror').innerHTML = 'Required'
          setTimeout(() => {

          document.querySelector('.distanceerror').innerHTML = ''
            
          }, [3000]);
    document.querySelector('.loadwebardesk').style.display= 'none'


          return
      } 
      else{
        document.querySelector('.distancefield').style = 'border: none'

      }
    

    document.querySelector('.loadwebardesk').style.display= 'block'

      setImageUrlFinal('')
     


     
      const body={
        image: imageurl[0],
        distance: walldistancedesk,
        url:  val.imageurl[0]
       
      }
    
      axios.post('http://13.233.124.197:5000/segment', body).then(res=>{

      if(res){
        document.querySelector('.defaultimagedesk').style.display = 'none'
        document.querySelector('.processimagedesk').style.display = 'block'


    document.querySelector('.loadwebardesk').style.display= 'none'

      }

         setImageUrlFinal( res.data.segmented_image_url)

          

     
         

        
       
    
      }).catch(error =>{
        console.log(error)
      })

    }
    if(!checked){
      setCollectionArray('')
      document.querySelector(`#divselect_${len}`).style= 'border: none'
    

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


 

  
 {
  /*
 

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

*/}

let pricevalue; 



const handlepricebutton=()=>{


  
   
     
    
    



}



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





const handleApplyFilter=()=>{

 
  const body={
    brand: brandidnew,
    tagvalue: filterTags,
    colorvalue: filtercolor,
    collectionvalue: filtercollection,
    designstyle: filterdesign,
    maxprice: Number(maxprice),
    minprice: Number(minprice)
  }

  axios.post(filterdataurl, body).then(res=>{
    if(res.status === 200){

      console.log(res.data)

   let newdata=    res.data.filter((item)=>(
        item.subcategory === 'Wallpapers'
      ))
      setFilterData(newdata)
    }

  }).catch(error=>{
    console.log(error)
  })
  

}

const closeCamera=()=>{
  
  document.querySelector('.closecamera').style.display= 'none'
  document.querySelector('.camdisplay').style.display= 'none'



}

console.log(imgSrc)
const handlePictureClick=()=>{


  const imgsrc= webcamRef.current.getScreenshot()
   if(imageurl.length > 0){
    imageurl.pop()
    setImageUrl([...imageurl, imgsrc])
   } else{
    setImageUrl([...imageurl, imgsrc])

   }

   document.querySelector('.defaultimagedesk').style.display= 'block'
  
  if(distancewall === ''){/*
    document.querySelector('.inp').style = 'border: 2px solid red'
    document.querySelector('#distancemessage').innerHTML= 'Required'
    return

*/}
document.querySelector('.closecamera').style.display= 'none'
document.querySelector('.camdisplay').style.display= 'none'

document.querySelector('.displayurlcontainer').style.display= 'block'

    

   
    setCameraOnStatus(true)
  

}







const openCamera=()=>{
  document.querySelector('.camdisplay').style.display= 'block'
  document.querySelector('.closecamera').style.display= 'block'

  document.querySelector('.displayurlcontainer').style.display= 'none'



  
}



const handleImageClick=(val)=>{
  const body={
    image: camera,
  
   
  }

  axios.post('http://13.233.124.197:5000/segment', body).then(res=>{
    setImageUrlFinal(res.data.segmented_image_url)

  }).catch(error =>{
    console.log(error)
  })

}



const fileToBase64 = (file, cb) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    cb(null, reader.result)
  }
  reader.onerror = function (error) {
    cb(error, null)
  }
}


const handleImageUploadMobile=(e)=>{

  let val= document.getElementById('filemobile').value;
  let indx = val.lastIndexOf(".") + 1;
  let filetype = val.substr(indx, val.length).toLowerCase();

  if(filetype === "jpg"  || filetype === "png" || filetype === "jpeg" ){

    let files = Array.from(e.target.files) 

 
    files.forEach(file => {
     fileToBase64(file, (err, result) => {
       if (result) {

      
     document.querySelector('.defaultimage').style.display = 'block'
  
        if(mobileimage.length > 0){
          mobileimage.pop()
          setMobileImage([...mobileimage, result])
        

       }else{
        setMobileImage([...mobileimage, result])
       

       
       }
       
       
     }
 })
    
   
   
     
     
   
     const reader = new FileReader();
   
     reader.onload = () => {
      
        
        
     }
       
   
     
     reader.readAsDataURL(file)
     
   })




  }

  else{
    document.querySelector('.filemessage').innerHTML= 'Only .png, .jpg, .jpeg accepted'
    setTimeout(() => {

    document.querySelector('.filemessage').innerHTML= ''

      
    }, [3000]);
  }

  




}

const  handleImageUpload =(e)=>{
 

  let val= document.getElementById('fileinput').value;
  let indx = val.lastIndexOf(".") + 1;
  let filetype = val.substr(indx, val.length).toLowerCase();

  if(filetype === "jpg"  || filetype === "png" || filetype === "jpeg" ){

    let files = Array.from(e.target.files) 

 
    files.forEach(file => {
     fileToBase64(file, (err, result) => {
       if (result) {

        document.querySelector('.defaultimagedesk').style.display= 'block' 
        document.querySelector('.processimagedesk').style.display= 'none' 
   
    
       if(imageurl.length > 0){
          imageurl &&  imageurl.pop()
          setImageUrl([...imageurl, result])
          setFileExist(true)

       }else{
        setImageUrl([...imageurl, result])
        setFileExist(true)

       
       }
      

       
     }
 })
    
   
   
     
     
   
     const reader = new FileReader();
   
     reader.onload = () => {
      
        
        
     }
       
   
     
     reader.readAsDataURL(file)
     
   })




  }

  else{
    document.querySelector('.filemessage').innerHTML= 'Only .png, .jpg, .jpeg accepted'
    setTimeout(() => {

    document.querySelector('.filemessage').innerHTML= ''

      
    }, [3000]);
  }


}


const handleMobileImage=(item, len)=>{

  document.querySelector(`#mobdiv_${len}`).style= 'border: 2px solid gray'

  if(walldistancemob === ''){
    document.querySelector('.distancefieldmob').style = 'border: 1px solid red'
      document.querySelector('.distancefieldmobmessage').innerHTML = 'Required'
      setTimeout(() => {
        document.querySelector('.distancefieldmobmessage').innerHTML = ''

        
      }, [3000]);
  document.querySelector('.loadwebar').style.display= 'none'

      return
    }
    else{
      document.querySelector('.distancefieldmob').style = ''
  
    }



 

 

  document.querySelector('.loadwebar').style.display= 'block'

   
   


    const body={
      image: mobileimage[0],
      distance: walldistancemob,
      url:  item.imageurl[0]
     
    }
  
    axios.post('http://13.233.124.197:5000/segment', body).then(res=>{

    if(res){
  document.querySelector('.loadwebar').style.display= 'none'
  document.querySelector('.defaultimage').style.display= 'none'
  document.querySelector('.processimage').style.display= 'block'


    }
   
       setImageUrl( res.data.segmented_image_url)

        

   
       

      
     
  
    }).catch(error =>{
      console.log(error)
    })



 

 
 
}

const handleMobileImageSingle=(val)=>{

  document.querySelector('#mobdiv').style = 'border: 1px solid gray'

  if(walldistancemob === ''){
    document.querySelector('.distancefieldmob').style = 'border: 1px solid red'
      document.querySelector('.distancefieldmobmessage').innerHTML = 'Required'
      setTimeout(() => {
        document.querySelector('.distancefieldmobmessage').innerHTML = ''

        
      }, [3000]);
  document.querySelector('.loadwebar').style.display= 'none'

      return
    }
    else{
      document.querySelector('.distancefieldmob').style = ''
  
    }
  document.querySelector('.loadwebar').style.display= 'block'

  const body={
    image: mobileimage[0],
    distance: walldistancemob,
    url:  val.imageurl[0]
   
  }

  axios.post('http://13.233.124.197:5000/segment', body).then(res=>{

  if(res){
document.querySelector('.loadwebar').style.display= 'none'
document.querySelector('.defaultimage').style.display= 'none'
document.querySelector('.processimage').style.display= 'block'


  }
 
     setImageUrl( res.data.segmented_image_url)

      

  }).catch(error =>{
    console.log(error)
  })
}



 
  return (
    <div>
        <Navbar/>

        <div className='mobilescreen'>

          <div className='mobileinternal'>
            <div className='mobilebuttonscontainer'>
            <div className='buttonfilterdiv'> 
              
              <button class="filterlink" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
  Filter <i class='bx bx-filter'></i></button>
              </div>

          
              <div>
              <div class="upload-btn-wrapper">
  <button class="btn">Upload Image</button>
  <input type="file"  id='filemobile' name="myfile" onChange={handleImageUploadMobile} />
</div>
              </div>
              <div className='inputfordistance'>  
              <input type='text' placeholder='distance from wall' className= 'distancefieldmob'  value={walldistancemob}   onChange={(e)=>setWallDistanceMob(e.target.value)} />
              <div style={{marginTop:'10px'}} >
              <p className='distancefieldmobmessage' style={{color:'red', fontFamily:'monospace', fontSize:'18px'}}></p>
            </div>
            </div>

            </div>
            <div className='mobileimagecontainer'>
            <div className='loadwebar' >
    <div className='load'>

</div>

    </div>
              <img  className='defaultimage' src= {mobileimage && mobileimage}/>
              <img  className='processimage' src= {imageurl && imageurl}/>

              

              </div>
              <div className='mobilefiltercontainer'  >
               {
                singleitem &&
                <div>
                     <div id= 'mobdiv'  className='mobdivcontainer'  >
                   
                    
                        
                   <div className='mobileimage'   onClick={()=> handleMobileImageSingle(singleitem)} >
                  
                   <img src= {singleitem.imageurl[0]}/>
                  

                   </div>

                   <p>{singleitem.productname}</p>
                   </div>



                  </div>

               }



               {
                filterdata && filterdata.map((item, i)=>(

                 
                  
                       <div id={`mobdiv_${i}`}  className='mobdivcontainer'  >
                   
                    
                        
                    <div className='mobileimage'   onClick={()=> handleMobileImage(item, i)} >
                   
                    <img src= {item.imageurl[0]}/>
                   

                    </div>

                    <p>{item.productname}</p>
                    </div>

                 
               
                ))
               }
             
           
                
                </div>
                
  


            </div>
 
    

        </div>
        <div className='mainview'>

          <div className='filteritemcontainer'>  

          <div className='buttonscontainer'>
            <div className='buttonfilterdiv'> 
              
            <button class="filterlink" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
Filter <i class='bx bx-filter'></i></button>
            </div>
  


          </div>

          {
            singleitem && 

            <div className=''   >

             
            <div  className='' id='divsingle' >
            <label  htmlFor= 'checksingle'>
              <div className='filterimagecontainer' >
             
                 <img src= { singleitem &&  singleitem.imageurl[0]}  />
                  <input type='checkbox'   className='checkinput' id= 'checksingle' value={singleitem} onClick={()=>checkboxSingle(singleitem)} />

              </div>
              <div className='itemdetailscontainer'>
                <p>{ singleitem && singleitem.productname}</p>
               

              </div>
              </label> 
            </div>
           
      

            


          </div>
          }
          {
            filterdata && filterdata.map((item,i)=>(

              <div className=''   >

             
              <div  className='' >
              <label  htmlFor= {`check_${i}`}>
                <div className='filterimagecontainer' id={`divselect_${i}`} >
               
                   <img src= {item.imageurl[0]}  />
                    <input type='checkbox'   className='checkinput' id= {`check_${i}`} value={item} onClick={()=>checkboxClick(item,i)} />
  
                </div>
                <div className='itemdetailscontainer'>
                  <p>{item.productname}</p>
                 
  
                </div>
                </label> 
              </div>
             
        
  
              
  
  
            </div>

            ))
          }

  

          </div>
          <div className='displaycontainer'> 

          {

          }
          <div  className='closecamera'>

            <div   >
           
          <FaTimes onClick={closeCamera} style={{color:'red',borderRadius:'5px', fontSize:'20px', border:'1px solid red', cursor:'pointer'}}/>
        

            </div>
            <div className='buttonfilterdiv'>
              <button type='' onClick={handlePictureClick}>Click Picture</button>
            </div>
           
      
          </div>

          <div  className='camdisplay'>
         
      
 <Webcam ref= {webcamRef} 
 style={{width:'100%', height:'100%'}}
 mirrored={true}
 screenshotFormat='image/jpeg'
 screenshotQuality={1}
 
 />
   
 
 </div>  

   <div className='displayurlcontainer' >


 
  {
     
  <img className='defaultimagedesk' src={imageurl &&    imageurl}  /> 

 }

 
 
  {
    
  <img  className='processimagedesk' src={imageurlfinal &&    imageurlfinal}  alt='image'/> 

 }
   

 
 

    <div className='loadwebardesk' >
    <div className='load'>

</div>

    </div>
 

 </div>

  <div className='handleimagebuttons'>
  <div  className='buttonfilterdiv'>
              <button type='submit' onClick={openCamera} > Take Picture    <FaCamera/> </button>
          
            </div>
            <div  className='buttonimage'>
            <div class="upload-btn-wrapper">
  <button class="btn">Upload Image</button>
  <input type="file"  id='fileinput' name="myfile" onChange={handleImageUpload} />
</div>
            </div>
            
            <div className='inputfordistance'>  
              <input type='text' placeholder='distance from wall' className='distancefield'  value={walldistancedesk} onChange= {(e)=>setWallDistanceDesk(e.target.value)} />
              <div style={{marginTop:'10px'}} >
              <p className='distanceerror' style={{color:'red', fontFamily:'monospace', fontSize:'18px'}}></p>
            </div>
            </div>
          



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

export default ChangeWalls
