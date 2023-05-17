import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'

import { FaTimes } from 'react-icons/fa';


import Webcam from 'react-webcam'
import { useRef } from 'react'

import images from '../src/images/cameraimage.png'

import DataTable, { createTheme } from "react-data-table-component";
const branddetailsurl= 'https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/brands/details'
const brandspecificitems= 'https://api.arnxt.com/model/batchmodelurl/excel/10/0'

const Wall = () => {

    const [imageurl, setImageUrl] = useState()

    const [branditems, setBrandItems] = useState();
    const [selectedvalue, setSelectedValue] =  useState();
  
    const [itemarray, setItemArray] = useState([]);
    const [camera, setCamera] = useState()
    const [cameraonstatus, setCameraOnStatus] = useState(false);
    const [distance, setDistance] = useState('');
  
    const [displaydivcamera, setDisplayDivCamera] = useState(false)
    const [displaydivfiles, setDisplayDivFiles] = useState(false)
  
    const [imageurlfinal, setImageUrlFinal] = useState()
    const [imageurlfinalfiles, setImageUrlFinalFiles] = useState()
  
    const [file, setFile] = useState();
  
    const [walldistance, setWallDistance] = useState('');
  
    const [checkdiv, setCheckDiv] = useState(true)
  
    
    const webref= useRef(null)
  
  
  
    createTheme("solarized", {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198"
      },
      background: {
        default: "#002b36"
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF"
      },
      divider: {
        default: "#073642"
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)"
      }
    });
  
  
    const columns= [
  
      {
        name: "Model Id",
        selector: row => row.modelId,
        sortable: true
      },
      {
        name: "Model type",
        selector: row=> row.modelType,
        sortable: true
      },
      {
        name: "Model Brand",
        selector: row=> row.modelBrand,
        sortable: true
      },
      {
        name: "Model Name",
        selector: row=> row.modelName,
        sortable: true
      }
      ,{
        name: "Model image",
        selector: (row) => (
          <img src={row.previewLocation} width="250px" height="250px" />
        )
         
      },
      
  
  
    ]
    const data=[
  
    ]
  
  
  
  
  
   
  
  
    const user= sessionStorage.getItem('user')
    const brandid= JSON.parse(user)
  
    const brandidnew= brandid.brand.toLowerCase()
  
  
    useEffect(()=>{
      const brandbody={
        brandID: brandid.brand
      }
    
      axios.post(branddetailsurl, brandbody).then(res=>{
        setImageUrl(res.data.infoImageUrl)
      }).catch(error=>{
        console.log(error)
      })
  
      axios.get(`https://api.arnxt.com/model/batchmodelurl/${brandidnew}/10/0`).then(res=>{
        
       
        setBrandItems(res.data)
      }).catch(error=>{
        console.log(error)
      })
  
      setTimeout(() => {
        document.querySelector('.imagecontainer').style.display='none'
        document.querySelector('.load').style.display='none'
        document.querySelector('.productlistcontainer').style.display ='block'
        document.querySelector('.camdiv').style.display='block'
        document.querySelector('.footernew').style.display='block'
  
       
    
        
      }, [4000]);
  
    },[])
  
  
  const handletableClick=(e)=>{
    setSelectedValue(e.selectedRows)
  
  
  
  }
  
  const checkboxClick=(val,len)=>{
    let checked= false;
    if(document.querySelector(`#check_${len}:checked`)){
      checked = true;
    } 
    else{
      checked = false;
    }
    if(checked){
  
      setItemArray([...itemarray, val])
      document.querySelector(`#divselect_${len}`).style= 'border: 2px solid #2e6180'
     
    }
  
    if(!checked){
    
  
      setItemArray((oldArray)=>oldArray.filter((item)=>
     
      item != val
        ))
      document.querySelector(`#divselect_${len}`).style= 'border: none'
  
  
    }
  
   
  }
  
  
  
  if(itemarray){
  
    sessionStorage.setItem('images', JSON.stringify(itemarray))
  
  
  }
  const openCamera= ()=>{
  
      if(document.querySelector('#fileinput').value !== ''){
        document.querySelector('.cameramessage').innerHTML='please refresh you have already selected a file'
        setTimeout(() => {
        document.querySelector('.cameramessage').innerHTML=''
  
          
        }, [3000]);
        return
      }
  
    document.querySelector('.displaycameracontainer').style.display= 'none'
    document.querySelector('.displayfilescontainer').style.display= 'none'
  
  
    if(camera){
      document.querySelector('.cameramessage').innerHTML= 'image already taken please refresh to take new'
      setTimeout(() => {
      document.querySelector('.cameramessage').innerHTML= ''
  
        
      }, [3000]);
   
  
      
  
      return
    }
  
    if(!camera){
      document.querySelector('.camdivnew').style.display= 'block'
      setCameraOnStatus(true)
    
  
    }
    
   
  }
  
  
  const takePicture=()=>{
  
    if(camera){
      document.querySelector('.cameramessage').innerHTML= 'image already taken please refresh to take new'
     
      setCameraOnStatus(false)
      setTimeout(() => {
      document.querySelector('.cameramessage').innerHTML= ''
  
        
      }, [3000]);
   
  
      
  
      return
  
    }
  
    if(cameraonstatus){
      setCamera(webref.current.getScreenshot())
    
    }
    
    if(!cameraonstatus){
      document.querySelector('.cameramessage').innerHTML= 'please turn on the camera'
      setCameraOnStatus(false)
      setTimeout(() => {
      document.querySelector('.cameramessage').innerHTML= '' 
  
        
      }, [3000]);
  
      return
  
    }
    
  
    
  }
  
  
  const refreshPicture=()=>{
    setCamera(null)
    setDistance('')
    document.querySelector('#fileinput').value= ''
  }
  
  const handleImagesend=(val)=>{
  
    if(!camera && !file){
      document.querySelector('.cameramessage').innerHTML= 'please take a picture or send a picture'
      setTimeout(() => {
      document.querySelector('.cameramessage').innerHTML= ''
  
        
      }, [3000]);
      return
  
    }
  
    
  
   
  
    if(camera){
      setImageUrlFinal(camera)
  
     
  
      if(distance === ''){
        document.querySelector('.cameramessage').innerHTML= 'distance from wall required'
        document.querySelector('.inputdistancefile').style= 'border: 2px solid red'
  
        setTimeout(() => {
        document.querySelector('.cameramessage').innerHTML= ''
  
          
        }, [3000]);
        return
      }
  
      else{
        document.querySelector('.inputdistancefile').style= ''
        document.querySelector('.displaycameracontainer').style.display= 'block'
        document.querySelector('.loadingdiv').style.display= 'block'
  
  
        
    
  
  
      }
  
  
      const body={
        image: camera,
        distance: distance,
        url: val
      }
    
      axios.post('http://13.233.124.197:5000/segment', body).then(res=>{
  
      if(res){
       
        setImageUrlFinal(res.data.segmented_image_url)
        document.querySelector('.loadingdiv').style.display= 'none'
  
    
  
  
    
  
  
      }
     
    
      
      }).catch(error=>{
        if(error.message === 'Network Error'){
          window.alert('sorry server down try after some time')
          document.querySelector('.displayimagediv').style.display= 'none'
        }
      
      })
    
  
    }
  
    if(file){
      setImageUrlFinalFiles(null)
     
  
      if(distance === ''){
        document.querySelector('.cameramessage').innerHTML= 'distance from wall required'
        document.querySelector('.inputdistancefile').style= 'border: 2px solid red'
  
        setTimeout(() => {
        document.querySelector('.cameramessage').innerHTML= ''
  
          
        }, [3000]);
        return
      } 
  
      else{
        document.querySelector('.inputdistancefile').style= ''
      document.querySelector('.displayfilescontainer').style.display= 'block'
      document.querySelector('.loadingdivnew').style.display= 'block'
  
  
  
  
      }
     
     
  
  
  
    
      const body={
        image: file,
        distance: distance,
        url: val
      }
    
      axios.post('http://13.233.124.197:5000/segment', body).then(res=>{
        console.log(res)
  
        if(res){
        
        setImageUrlFinalFiles(res.data.segmented_image_url)
        document.querySelector('.loadingdivnew').style.display= 'none'
  
  
  
      
  
      
  
  
  
  
      
  
        }
       
    
      
      }).catch(error=>{
        if(error.message === 'Network Error'){
          window.alert('sorry server down try after some time')
          document.querySelector('.displayimagediv').style.display= 'none'
        }
      })
    
    }
  
  
  
  
  }
  
  
  
  
  
  const closeCamera=()=>{
    setCameraOnStatus(false)
    document.querySelector('.camdivnew').style.display = 'none'
  }
  
  if(camera){
    document.querySelector('.camdivnew').style.display= 'none'
  
  
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
  
  
  const handleFile=(e)=>{
  
    let val= document.getElementById('fileinput').value;
    let indx = val.lastIndexOf(".") + 1;
    let filetype = val.substr(indx, val.length).toLowerCase();
  
    if(filetype === "jpg"  || filetype === "png" || filetype === "jpeg" ){
  
      let files = Array.from(e.target.files) 
  
   
      files.forEach(file => {
       fileToBase64(file, (err, result) => {
         if (result) {
     
       document.querySelector('.camdivnew').style.display= 'none'
       document.querySelector('.displaycameracontainer').style.display= 'none'
       document.querySelector('.displayfilescontainer').style.display= 'none'
  
  
     
           setFile(result)
          
     
     
         
         
          
         }
       })
      
     
     
       
       
     
       const reader = new FileReader();
     
       reader.onload = () => {
        
          
          
       }
         
     
       
       reader.readAsDataURL(file)
       
     })
  
  
  
  
    }
  
    else{
      document.querySelector('.cameramessage').innerHTML= 'Only .png, .jpg, .jpeg accepted'
      setTimeout(() => {
  
      document.querySelector('.cameramessage').innerHTML= ''
  
        
      }, [3000]);
    }
  
  
  }
  
  
  


  return (
    <div>

    <Navbar/>
 
  

    <div  className='wallpapercontainer'>

    <div className='divmainimage' >

    <div className='imagecontainer'>
        <img src= {imageurl} className='imgmaindiv' />

      </div>
      <div className="load"></div>

    </div>




    </div>

    {
      /*
    

    <div  className='tablediv' style={{marginTop:'150px'}}>
    <DataTable

   
      title="Modles"
      columns={columns}
      data={branditems && branditems.data}
      pagination
      highlightOnHover
      selectableRows
      fixedHeader
      onSelectedRowsChange={handletableClick}
    />
    </div>

    */}


    {
      /*



  <div  className='checkboxinsidetwo'>
<img src={item.previewLocation} width='200px' height='200px'/>


  </div>






<div className='cardproductfooter'>

<p>{item.modelName}</p>

</div>

*/
    }
 


   
    <div  className='productlistcontainer'>

   
    <div className='productlistdiv'>

      {

      branditems && branditems.data.map((item,i)=>(

       
        <div  id={`divselect_${i}`} >

<label htmlFor= {`check_${i}`}>

<div className='checkboxmain' >
<input type='checkbox'   className='checkinput' id= {`check_${i}`} value={item} onClick={()=>checkboxClick(item,i)} />

<div className='imagedivcontainer' >
<img src={item.previewLocation} width='200px' height='200px'/>



</div>
<div className='modelnamecontainer'> 

<p>{item.modelName}</p>

</div>


</div>



</label>


</div>
     
  
           
        

      ))

      
    
      
      }



     

     


    </div>



    </div>

  <div  className='displaycameracontainer'>

  <div className='displayimagediv'>
  <div  className='loadingdiv'>

<div className='load'>

</div>

</div>






{
imageurlfinal &&
<img src={imageurlfinal}  />



}





</div>

</div>

<div className='displayfilescontainer'>
<div className='displayfilesdiv' >
<div  className='loadingdivnew'>

<div className='loadnew'>

</div>

</div>


{
imageurlfinalfiles && 
<img src={imageurlfinalfiles}  />
}





</div>



</div>





 

   
    <div  className='camdivnew'>
       
      <span  onClick={closeCamera}  style={{cursor:'pointer'}} >
       <FaTimes style={{color:'red', fontSize:'20px'}}/>
      </span>
<Webcam ref={webref} 
mirrored={true}
screenshotFormat='image/jpeg'
screenshotQuality={1}

/>


</div>
 <div  className='picturedisplaydiv'>

  {
    camera && 

    <img src= {camera} />
  }
   
 </div>

    <div  className='camdiv'>

  
    <div className='cameracontainer'> 

    <div className='optioncontainer'>
      {
        itemarray && itemarray.map(item=>(

          <div>
          <img  onClick={()=>handleImagesend(item.previewLocation)} src={item.previewLocation} width='100%' height='100%' style={{ cursor:'pointer'}} />
         </div>


        ))
      }                     
      
      


    </div>



    <div style={{marginRight:'20px'}} >
   <a  onClick={openCamera}  > <img     src={images} width='80px' height='80px' alt='cam' /></a>


    </div>




  
  
    <div className='takepicturecontainer'>

    <div  style={{marginBottom:'10px'}}  >

<button type='submit'  className='takepicture' onClick={takePicture} > <p>Take picture <i style={{fontSize:'15px'}} class='bx bxs-image-alt'></i></p> </button>
</div>
<span  style={{marginBottom:'10px', fontSize:'20px', fontFamily:'monospace'}}>Or</span>

<div class="upload-btn-wrapper">
<button class="btn">Select Image</button>
<input type="file"  id='fileinput' name="myfile" onChange={handleFile} />
</div>


    </div>
   

    <div style={{marginRight:'20px'}} >

        <button type='submit' className='refreshbutton' onClick={refreshPicture} > <i style={{fontSize:'30px'}} class='bx bx-refresh'></i></button>
          </div>

          <div style={{marginRight:'20px'}}> 
         <input type='number'  value={distance}  className='inputdistancefile' id='inputdistance' placeholder='distance from wall' onChange={(e)=>setDistance(e.target.value)} />

          </div>

     


    </div>
 <p className='cameramessage'   style={{ marginBottom: '40px'}} ></p>

 


 </div>


 <div  className='footernew'>

 </div>


 
  </div>
  )
}

export default Wall
