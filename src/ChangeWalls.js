import React, { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './Navbar'
import { RiAddLine, RiArrowDownSLine } from 'react-icons/ri';
import axios from 'axios';
import Webcam from 'react-webcam'

import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaCamera, FaExclamationCircle, FaTimes } from 'react-icons/fa';

import MultiRangeSlider from "multi-range-slider-react";

import checked from '../src/Assets/checked.svg'
import unChecked from '../src/Assets/unchecked.svg'
import { useHistory, useLocation } from 'react-router-dom';
import  checkbox from '../src/images/check-circle.svg';
import tryimage1 from '../src/images/31.jpg';
import tryimage2 from '../src/images/32.jpg';
import tryimage3 from '../src/images/33.jpg';
import { Helmet } from 'react-helmet';






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
const sendviewdataurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/addviewdata'


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

    const [filterdata, setFilterData] = useState('')  
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
   const [webar, setWebar] = useState(false)
   const [minvalue, setMinValue] = useState(2000)
   const [maxvalue, setMaxValue] = useState(60000)
   const [rangemin, setRangeMin] = useState(2000)
   const [rangemax, setRangeMax] = useState(60000)


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
      setRangeMax(e.maxValue)
      setRangeMin(e.minValue)

   };

   


 

    const user= sessionStorage.getItem('user')
      let brandid;
      let brandidnew;
      let userdata;
      if(user && user.includes('data')){
        brandid= JSON.parse(user)
  
        brandidnew= brandid.data.brand.toLowerCase()
        userdata= JSON.parse(user)
      }
      if(user && !user.includes('data')){
        brandidnew = user
      }
  

    
    if(!user){
      history.push('/')
    }



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
   
      document.querySelector('#checkboxsingle').classList.add('checkboxadd')

    if(walldistancedesk === ''){
    document.querySelector('.distancefield').style = 'border: 1px solid red'
       
      document.querySelector('.distanceerror').innerHTML = 'Required'
      setTimeout(() => {

      document.querySelector('.distanceerror').innerHTML = ''
        
      }, [3000]);
document.querySelector('.loadwebardesk').style.display= 'none'


      return
  } 
 
  document.querySelector('.loadwebardesk').style.display= 'block'

    setImageUrlFinal('')
   


    
    const body={
      image: imageurl,
      distance: walldistancedesk,
      url:  val.imageurl[0]
     
    }
  
    axios.post('https://wallchange.arnxt.com/segment', body).then(res=>{

    if(res){
      const bodyview={
        Id : lastId,
        source: 'Web',
        merchantId: Number(val.merchant_Id),
        productId: Number(val.product_Id),
        userId: userdata.data.userID, 
        viewtime:  lastId
      }

      axios.post(sendviewdataurl, bodyview).then(res=>{
        console.log(res)
      }).catch(error=>{
        console.log(error)
      })
  document.querySelector('.loadwebardesk').style.display= 'none'

  document.querySelector('.defaultimagedesk').style.display = 'none'
  document.querySelector('.processimagedesk').style.display = 'block'



    }
      
       setImageUrlFinal( res.data.segmented_image_url)

       
  
    }).catch(error =>{
      document.querySelector('.loadwebardesk').style.display= 'none'

      window.alert('server issue')
      console.log(error)
    })

  }
  if(!checked){
    setCollectionArray('')
   
    document.querySelector('#checkboxsingle').classList.remove('checkboxadd')


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
  
    axios.post('https://wallchange.arnxt.com/segment', body).then(res=>{

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

 let date = new Date();

 let lastId = 0;

 function getId(){
   let currentId = new Date().getTime();
   if (lastId == currentId) {
     currentId++;
   }
   lastId = currentId;
   return lastId;
}




const checkboxClick=(val, len)=>{
  
   getId()
    let checked = false
   
 
    
    document.querySelector('.arrowblinkdiv').style.display= 'none' 
    document.querySelector('.applytextdiv').style.display= 'none' 
    
    if(document.querySelector(`#check_${len}:checked`)){
      checked = true;
    } 
    else{
      checked = false;
    }

    if(checked){
      document.querySelector(`#divselect_${len}`).classList.add('checkboxadd')
     

      let get= document.getElementsByName('checkinputclick');

      let allelement= document.querySelectorAll('.filtercheckbox')

      for(let i =0; i< allelement.length; i++){
        if(len !==i){
          allelement[i].classList.remove('checkboxadd')

        }
      }
     
      for(let i= 0; i<get.length; i++){
        if(len !== i){
          get[i].checked= false;
         
     
        }
      
     }
      
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
        image: imageurl,
        distance: walldistancedesk,
        url:  val.imageurl[0]
       
      }
    
      axios.post('https://wallchange.arnxt.com/segment', body).then(res=>{

      if(res){
        document.querySelector('.defaultimagedesk').style.display = 'none'
        document.querySelector('.processimagedesk').style.display = 'block'


    document.querySelector('.loadwebardesk').style.display= 'none'

        const bodyview={
          Id : lastId,
          source: 'Web',
          merchantId: Number(val.merchant_Id),
          productId: Number(val.product_Id),
          userId: userdata.data.userID, 
          viewtime:  lastId
        }

        axios.post(sendviewdataurl, bodyview).then(res=>{
          console.log(res)
        }).catch(error=>{
          console.log(error)
        })

      }

         setImageUrlFinal( res.data.segmented_image_url)

          

     
         

        
       
    
      }).catch(error =>{
    document.querySelector('.loadwebardesk').style.display= 'none'

       window.alert('server issue')
      })

    }
 
    if(!checked){
      setCollectionArray('')
      document.querySelector(`#divselect_${len}`).classList.remove('checkboxadd')
    
    

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
  setRangeMax(60000)
  setRangeMin(2000)
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

const newtag= ['New']


useEffect(()=>{

   if(!location.state ){

    const body={
      brand: brandidnew,
      tagvalue: newtag,
      colorvalue: filtercolor,
      collectionvalue: filtercollection,
      designstyle: filterdesign,
      maxprice: Number(maxprice),
      minprice: Number(minprice)
    }
  
    axios.post(filterdataurl, body).then(res=>{
      if(res.status === 200){
  
       
  
     let newdata=    res.data.filter((item)=>(
          item.subcategory === 'Wallpapers'
        ))
        setFilterData(newdata)
      }
  
    }).catch(error=>{
      console.log(error)
    })

  

   }

  
   


},[])





const handleApplyFilter=()=>{
   setSingleItem('')   
    
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
  
  document.querySelector('.camdisplay').style.display= 'none'
 
  document.querySelector('.closecamera').style.display= 'none'
document.querySelector('.displayurlinside').style.display= 'block'
document.querySelector('.defaulttextcontainer').style.display = 'flex '





}


const handlePictureClick=()=>{


  const imgsrc= webcamRef.current.getScreenshot()
    setImageUrl(imgsrc)
   document.querySelector('.defaultimagedesk').style.display= 'block'
   document.querySelector('.arrowblinkdiv').style.display= 'block'
   document.querySelector('.applytextdiv').style.display= 'block'
  
  if(distancewall === ''){/*
    document.querySelector('.inp').style = 'border: 2px solid red'
    document.querySelector('#distancemessage').innerHTML= 'Required'
    return

*/}
document.querySelector('.closecamera').style.display= 'none'
document.querySelector('.camdisplay').style.display= 'none'

document.querySelector('.displayurlinside').style.display= 'block'

    

   
    
  

}







const openCamera=()=>{

 
 
  document.querySelector('.defaultimagedesk').style.display = 'none'
  document.querySelector('.camdisplay').style.display= 'block'
 
  document.querySelector('.closecamera').style.display= 'block'
  document.querySelector('.defaulttextcontainer').style.display = 'none'
  document.querySelector('.arrowblinkdiv').style.display= 'none'
  document.querySelector('.applytextdiv').style.display= 'none'



  
}



const handleImageClick=(val)=>{
  const body={
    image: camera,
  
   
  }

  axios.post('https://wallchange.arnxt.com/segment', body).then(res=>{
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

const  uploadFile =(e)=>{
   console.log(e)
   document.querySelector('.loadwebardesk').style.display= 'none'


   document.querySelector('.camdisplay').style.display= 'none'
 
   document.querySelector('.closecamera').style.display= 'none'

  let val= document.getElementById('fileinput').value;
  let indx = val.lastIndexOf(".") + 1;
  let filetype = val.substr(indx, val.length).toLowerCase();

  if(filetype === "jpg"  || filetype === "png" || filetype === "jpeg" ){

    let files = Array.from(e.target.files) 

 
    files.forEach(file => {
     fileToBase64(file, (err, result) => {
       if (result) {
        console.log(result)
         document.querySelector('.defaulttextcontainer').style.display= 'none'
        document.querySelector('.defaultimagedesk').style.display= 'block' 
        document.querySelector('.processimagedesk').style.display= 'none' 
        document.querySelector('.arrowblinkdiv').style.display= 'block' 
        document.querySelector('.applytextdiv').style.display= 'block' 

           
    
       setImageUrl(result)
      

       
     }
 })
    
   
   
     
     
   
     const reader = new FileReader();
   
     reader.onload = () => {
      
        
        
     }
       
   
     
     reader.readAsDataURL(file)
     
   })




  }

  else{
    document.querySelector('.defaulttextcontainer').style.display= 'flex'
     
      document.querySelector('.alertpopup').style.display = 'flex '
     document.querySelector('.alerttext').innerHTML = 'Only jpg, jpeg, png files are supported'
    setTimeout(() => {

      document.querySelector('.alertpopup').style.display = 'none '
     document.querySelector('.alerttext').innerHTML = ''

      
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
  
    axios.post('https://wallchange.arnxt.com/segment', body).then(res=>{

    if(res){
      const bodyview={
        Id : lastId,
        source: 'Web',
        merchantId: Number(item.merchant_Id),
        productId: Number(item.product_Id),
        userId: userdata.data.userID, 
        viewtime:  lastId
      }

      axios.post(sendviewdataurl, bodyview).then(res=>{
        console.log(res)
      }).catch(error=>{
        document.querySelector('.loadwebardesk').style.display= 'none'

        window.alert('server issue')
        console.log(error)
      })
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

  axios.post('https://wallchange.arnxt.com/segment', body).then(res=>{

  if(res){
    const bodyview={
      Id : lastId,
      source: 'Web',
      merchantId: Number(val.merchant_Id),
      productId: Number(val.product_Id),
      userId: userdata.data.userID, 
      viewtime:  lastId
    }

    axios.post(sendviewdataurl, bodyview).then(res=>{
      console.log(res)
    }).catch(error=>{
      document.querySelector('.loadwebardesk').style.display= 'none'

      window.alert('server issue')
      console.log(error)
    })
document.querySelector('.loadwebar').style.display= 'none'
document.querySelector('.defaultimage').style.display= 'none'
document.querySelector('.processimage').style.display= 'block'


  }
 
     setImageUrl( res.data.segmented_image_url)

      

  }).catch(error =>{
    console.log(error)
  })
}

const filterbuttonClick =()=>{
     
    setWebar(!webar)
  
  document.querySelector('.container').classList.add('containertoggle')

  document.querySelector('.maindivcontainerwebardefault').classList.remove()
  document.querySelector('.maindivcontainerwebardefault').classList.add('maindivcontainerwebar')
}

const closefilterbutton =()=>{
 
   setWebar(!webar)

   document.querySelector('.container').classList.remove('containertoggle')
 
 // document.querySelector('.maindivcontainer').classList.remove('maindivcontainer')

 

}


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

const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = () => {
      const base64data = reader.result;   
      resolve(base64data);
    }
  });
}

const handleTryImageOne=()=>{
  getBase64FromUrl(tryimage1).then(res=>{
    document.querySelector('.camdisplay').style.display= 'none'
 
    document.querySelector('.closecamera').style.display= 'none'

    document.querySelector('.defaulttextcontainer').style.display= 'none'
    document.querySelector('.defaultimagedesk').style.display= 'block' 
    document.querySelector('.processimagedesk').style.display= 'none' 
    document.querySelector('.arrowblinkdiv').style.display= 'block' 
    document.querySelector('.applytextdiv').style.display= 'block' 
    setImageUrl(res)


  }) 
}

const handleTryImageTwo=()=>{
  getBase64FromUrl(tryimage2).then(res=>{
    document.querySelector('.camdisplay').style.display= 'none'
 
    document.querySelector('.closecamera').style.display= 'none'

    document.querySelector('.defaulttextcontainer').style.display= 'none'
    document.querySelector('.defaultimagedesk').style.display= 'block' 
    document.querySelector('.processimagedesk').style.display= 'none' 
    document.querySelector('.arrowblinkdiv').style.display= 'block' 
    document.querySelector('.applytextdiv').style.display= 'block' 
    setImageUrl(res)
  }) 
}
const handleTryImageThree=()=>{
  getBase64FromUrl(tryimage3).then(res=>{
    document.querySelector('.camdisplay').style.display= 'none'
 
    document.querySelector('.closecamera').style.display= 'none'

    document.querySelector('.defaulttextcontainer').style.display= 'none'
    document.querySelector('.defaultimagedesk').style.display= 'block' 
    document.querySelector('.processimagedesk').style.display= 'none' 
    document.querySelector('.arrowblinkdiv').style.display= 'block' 
    document.querySelector('.applytextdiv').style.display= 'block' 
    setImageUrl(res)
  }) 
}






 
  return (
    <div  id='my-component' className=  {webar ? "maindivcontainerwebar" :'maindivcontainerwebardefault'}>
          <Helmet>
            <title>AR view | ARnxt</title>
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

        <div className='mobilescreen'>

          <div className='mobileinternal'>
            <div className='mobilebuttonscontainer'>
            <div className='buttonfilterdiv'> 
              
              <button class="filterlink" type="button"   data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
  Filter <i class='bx bx-filter'></i></button>
              </div>

          
              <div>
              <div class="upload-btn-wrapper">
  <button class="btn">Upload Image</button>
  <input type="file"  id='filemobile' name="myfile" onChange={handleImageUploadMobile} />
  <p className='filemessage'></p>
</div>
              </div>
              <div className='inputfordistance'>  
              <input type='text' placeholder='distance from wall in feet' className= 'distancefieldmob'  value={walldistancemob}   onChange={(e)=>setWallDistanceMob(e.target.value)} />
              <div style={{marginTop:'10px'}} >
              <p className='distancefieldmobmessage' style={{color:'red', fontFamily:'Lato, sans-serif', fontSize:'18px'}}></p>
            </div>
            </div>

            </div>
            <div className='mobileimagecontainer'  id='my-component'>
            <div className='loadwebar' >
    <div className='load'>

</div>

    </div>
              <img  className='defaultimage' src= {mobileimage && mobileimage}/>
              <img  className='processimage' src= {imageurl && imageurl}/>

              

              </div>
              <div className='mobilefiltercontainer'  id='my-component'  >
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

                 
                  
                       <div id={`mobdiv_${i}`}  className='mobdivcontainer'   >
                   
                    
                        
                    <div className='mobileimage'    onClick={()=> handleMobileImage(item, i)} >
                   
                    <img src= {item.imageurl[0]} />
                   

                    </div>

                    <p>{item.productname}</p>
                    </div>

                 
               
                ))
               }
             
           
                
                </div>
                
  


            </div>
 
    

        </div>
        <div className='mainview'  >

          <div className='filteritemcontainer'>  

          <div className='buttonscontainer'>
            <div className='buttonfilterdiv'> 
              
            <button class="filterlink" type="button" disabled={webar ? true : false} onClick={filterbuttonClick} data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
Filter <i class='bx bx-filter'></i></button>
            </div>
  


          </div>

          {
            singleitem && 

            <div className=''   >

             
            <div  className='' id='divsingle' >
            <label  htmlFor= 'checksingle'>
              <div className='filterimagecontainer'  id='my-component' >
              <div  >
                  <label className='filtercheckbox' id='checkboxsingle'  >
              
                  <input type='checkbox'   className='checkinput' id= 'checksingle' value={singleitem} onClick={()=> checkboxSingle(singleitem)} />
                  
                  </label>
                  </div>
             
                 <img src= { singleitem &&  singleitem.imageurl[0]}  />

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

             
              <div  className=''  >
              <label  htmlFor= {`check_${i}`} id='my-component' >
            
                <div className='filterimagecontainer'  >
                  <div  >
                  <label className='filtercheckbox'  id={`divselect_${i}`} >
                <input type='checkbox' name='checkinputclick'   id= {`check_${i}`} value={item} onClick={()=>checkboxClick(item,i)} />
                  
                  </label>
                  </div>
                
                  
               
                   <img src= {item.imageurl[0]}  />
                
                 
            
                     
                 
  
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
            /*
               <div  className='closecamera'>

            <div   >
           
          <FaTimes onClick={closeCamera} style={{color:'red',borderRadius:'5px', fontSize:'20px', border:'1px solid red', cursor:'pointer'}}/>
        

            </div>
            <div className='buttonfilterdiv'>
              <button type='' onClick={handlePictureClick}>Click Picture</button>
            </div>
           
      
          </div>
            */
          } 
       

  
   <div className='displayurlcontainer' >
    <div className='displayurlinside'>
    <div  className='closecamera'>

<div   >

<FaTimes onClick={closeCamera} style={{color:'red',borderRadius:'5px', fontSize:'20px', border:'1px solid red', cursor:'pointer'}}/>


</div>
<div className='buttonfilterdiv'>
  <button type='' onClick={handlePictureClick}>Click Picture</button>
</div>


</div>

<div className='alertpopup'>
     <span className='alertsymbol' ><FaExclamationCircle  style={{color:'red'}} /></span>  <p className='alerttext' ></p>
    </div>
    <div  className='camdisplay'>
         
      
         <Webcam ref= {webcamRef} 
       
         mirrored={true}
         screenshotFormat='image/jpeg'
         screenshotQuality={1}
         
         />
           
         
         </div> 
         
         <div className='arrowblinkdiv'>
         <svg class="arrows">
              <path class="a1" d="M0 0 L30 32 L60 0"></path>
              <path class="a2" d="M0 20 L30 52 L60 20"></path>
              <path class="a3" d="M0 40 L30 72 L60 40"></path>
              
            </svg>
           
         </div>
         <div className='applytextdiv'> 
         <p>Apply selected wallpaper here</p>

         </div>
         <div  className='defaulttextcontainer'>
      <div className='defaulttext'>
         <div className='defaultinsidetext'>
           <p>Capture your space or upload it’s image</p>
         </div>
      </div>

      </div>
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
        <div className='tryimagetext'>
          <p>Don't have a picture? Try our demo rooms instead</p>
        </div>

    
       <div className='defaultwallscontainer'>

  <div >
    <div className= 'trywall'>
    <label onClick={handleTryImageOne} >
       <div className='tryimagecontainer'>
        <img  src={tryimage1}/>

       </div>

        </label>

    </div>
   
  </div>
  <div>
  <div className= 'trywall'>
    <label onClick={handleTryImageTwo} >
       <div className='tryimagecontainer'>
        <img  src={tryimage2}/>

       </div>

        </label>

    </div>
  </div>
  <div>
  <div className= 'trywall'>
    <label onClick={handleTryImageThree} >
       <div className='tryimagecontainer'>
        <img  src={tryimage3}/>

       </div>

        </label>

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
  <input type="file"  id='fileinput' name="myfile" onChange={ uploadFile} />
</div>
            </div>
            
            <div className='inputfordistance'> 
            <label>Distance from wall (feet)</label> 
              <input type='text' placeholder=' eg - 8 feet' className='distancefield'  value={walldistancedesk} onChange= {(e)=>setWallDistanceDesk(e.target.value)} />
              <div style={{marginTop:'10px'}} >
              <p className='distanceerror' style={{color:'red', fontFamily:'Lato, sans-serif', fontSize:'18px'}}></p>
            </div>
            </div>
          



  </div>

      


    </div>



 
     
        

 
   
 

 

 </div>



 

 



 

          </div>
  


        </div>



        
<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel" style={{fontFamily:'Lato, sans-serif'}}>Filter</h5>
    <div className='buttonfilter'>
    <button  type='submit' onClick={handlefilterclear} >Clear</button>


    </div>
    <div className='buttonfilter'>
    <button type='submit'   onClick={handleApplyFilter}> Apply</button>


    </div>


    <button type="button" class="btn-close" onClick={closefilterbutton} data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">

  <div>


  <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed"  style={{fontFamily:'Lato, sans-serif'}} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
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
      <button class="accordion-button collapsed" style={{fontFamily:'Lato, sans-serif'}} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
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
      <button class="accordion-button collapsed" type="button" style={{fontFamily:'Lato, sans-serif'}} data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
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
      <button class="accordion-button collapsed" style={{fontFamily:'Lato, sans-serif'}} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
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
      <button class="accordion-button collapsed" style={{fontFamily:'Lato, sans-serif'}}  type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
       Price
      </button>
    </h2>
    <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">

      <div>
                               <div>
                               <div className="range">
       <MultiRangeSlider
             min= {minvalue}
             max={maxvalue}
             step={100}
             minValue= {rangemin}
             maxValue={rangemax}
       
           barInnerColor= "rgb(19, 209, 187)"
           ruler={false}
         
           onInput={(e) => {
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
