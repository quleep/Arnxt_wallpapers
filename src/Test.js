import React, { useState, useEffect } from "react";
import { useRef } from "react";

import Webcam from "react-webcam";

const Test = () => {

    const webcamRef = useRef(null);
    let imagesrc;

    const capture = React.useCallback(
        () => {
          imagesrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
      );


console.log(imagesrc)
 
  return (
    <div>

<Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
       
      />
      <button onClick={capture} >Capture photo</button>

        {
            /*
      

<div className='filterproductscontainer'>

<div>
<div  className='filtercontainer'>

<a class="filterlink" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
Filter <i class='bx bx-filter'></i></a>


</div>
</div>

<div>
 <button type='submit'>take Picture</button>
</div>
<div>
 <button>Upload Image</button>
</div>



</div>



<div className='filtereditemscontainer'>
<p>Filtered products</p>


 <div  className='filterproducts' >
    
 

     {
         filterproduct && filterproduct.map((item,i)=>(

             <label htmlFor= {`check_${i}`}>
                 
             <div className='filterinside' style={{margin:"20px"}} id={`divselect_${i}`}>
             <input type='checkbox'   className='checkinput'  id= {`check_${i}`} value={item} onClick={()=>handleWallpaper(item, i)}   />
             <img src={item.imageurl[0]}/>
             <p>{item.productname}</p>
             
         </div>


             </label>

         ))
     }
     
     




                 

 
 
 </div>





</div>

<div className='imagedivcontainer'>
<p>fgasfasdf</p>

</div>

    
    */}
      
    </div>
  )
}

export default Test
