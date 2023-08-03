import React, { useDebugValue, useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './Navbar'
import { RiAddLine, RiArrowDownSLine } from 'react-icons/ri';
import axios from 'axios';
import { MdKeyboardArrowDown } from 'react-icons/md';

import MultiRangeSlider from "multi-range-slider-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Swiper from 'swiper';

import bafflefilter from '../src/images/71TAn+qay+L.jpg';
import  thermalclean from '../src/images/download.jpg';
import newfridge from '../src/images/21379_front_1200x1200_2.png';
import highcapacity from '../src/images/istockphoto-1086056164-612x612.jpg';
import wallpaper from '../src/images/77308-1_2.jpg';
import wallmurals from '../src/images/ED-20949_2.jpg';
import image1 from '../src/images/HB-WB.jpeg';
import image2 from '../src/images/Home-page_OPULENCE.jpg';
import image3 from '../src/images/WhatsApp_Image_2023-01-20_at_11.18.49_AM.jpeg';
import aricon from '../src/images/image (2).png';
import curtain from '../src/images/download (31).jpg';






import  woddenfloors from '../src/images/wooden-floor-tiles-work-with-per-sq-ft-with-labour-charge--703.jpg';








import checked from '../src/Assets/checked.svg'
import unChecked from '../src/Assets/unchecked.svg'
import { useHistory, useLocation } from 'react-router-dom';
import { FaArrowRight, FaCamera, FaEye, FaRestroom } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

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
const branddetailsurl= 'https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/brands/details'
const roomtypeimageurl= 'https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/rooms'
const getroomsbybrandurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getroomsofbrand'
const gettagsbybrandurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/gettagsofbrand'
const getbranddetails= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getbranddetails'
const gettagsdataurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getsingletagdata'


const Brand = () => {

    const [minprice, setMinPrice] = useState('');
    const [maxprice, setMaxPrice] = useState('');
    const [categorytable, setCategoryTable] = useState();
    const [designtable, setDesignTable] = useState();
    const [colortable, setColorTable] = useState();
    const [collectiontable, setCollectionTable] = useState();
    const [tagstable, setTagsTable] = useState();

    const [searchvalue, setSearchValue] = useState(false)
const [currentIndex, setCurrentIndex] = useState(0);



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
    const [brandimage, setBrandImage] = useState()

    const [rooms, setRooms] = useState()
    const [roomimage, setRoomImage] = useState()
    const [tags, setTags] = useState()
    const [itemtype, setItemType] = useState()
    const [branddata, setBrandData] = useState()
    const [carouselimages, setCarouselImages] = useState()
    const [categoryimg, setCategoryImg] = useState()
    const [newtagsdata, setNewTagsData] = useState()
    const [featuredtagsdata, setFeaturedTagsData] = useState()
    const [toppickstagsdata, setTopPicksTagsData] = useState()

    const history= useHistory()

    const ref= useRef()


const location = useLocation()

    const handleInput = (e) => {

        setMinPrice(e.minValue);
        setMaxPrice(e.maxValue);

   };

   


   function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); 
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
  }

 

    const user= sessionStorage.getItem('user')
    


    if(!user){
      history.push('/')
    
    } 
    let brandidnew;
    let brandid
    if(user && user.includes('data')){
       brandid= JSON.parse(user)
       brandidnew=   brandid && brandid.data.brand.toLowerCase()
    }
    
    if(user && !user.includes('data')){
      brandidnew= user
    }

  
    const [accActive, setAccActive] = useState(false)
    useEffect(()=>{
      const brandbody={
        brand: brandidnew
      }
    
      axios.post(getbranddetails, brandbody).then(res=>{
        console.log(res.data)
         res.data.forEach(item=>{
         
           if(item.modelrequired === 'true'){
            setBrandData(res.data)
            setItemType('3d')
           }
         })
      
      }).catch(error=>{
        console.log(error)
      })

    },[])
    
    let newbrand;
    if(user && user.includes('data')){
     newbrand = brandid && brandid.data.brand
   }
   
   if(user && !user.includes('data')){
     newbrand= user.charAt(0).toUpperCase() + user.slice(1).toLowerCase()
   }
  

    useEffect(()=>{
      const brandbody={
      

        brandID: newbrand
      }
    
      axios.post(branddetailsurl, brandbody).then(res=>{
        console.log(res)
        setCategoryImg(res.data.categoryimages)
        setBrandImage(res.data.iconUrl)
        setCarouselImages(res.data.carouselUrls)
      }).catch(error=>{
        console.log(error)
      })

    },[])

    

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


useEffect(()=>{
  const body={
    brand: brandidnew
  }

  axios.post(getroomsbybrandurl, body).then(res=>{
    console.log(res.data)
     setRooms(res.data)

  }).catch(error=>{
    console.log(error)
  })

},[])

useEffect(()=>{
  const body={
    brand: brandidnew
  }

  axios.post(gettagsbybrandurl, body).then(res=>{
     setTags(res.data)

  }).catch(error=>{
    console.log(error)
  })

},[])

console.log(tags)

function removerepeat(data){
  return [...new Set(data)]
}

console.log(catdata)


{
  /*

let roomarray =[]
let catarr=[]
  catdata && catdata.map(item=>{
    item.roomtype.map(it=>{
      if(roomarray.includes(it)){

      }
      else{
        roomarray = [...roomarray]
        roomarray.push(it)
      }
    })
  })

  let tagsgroup= []
  catdata && catdata.map(item=>{
    item.tags.map(it=>{
      if(tagsgroup.includes(it)){

      }
      else{
        tagsgroup = [...tagsgroup]
        tagsgroup.push(it)
      }
    })
  })





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


*/}


const handlesubcategory=(item, len)=>{
 
  
    history.push({
      pathname: `/products`,
      state: item
  })
  
   



}

const handleRoomsClick=(item)=>{

  history.push({
      pathname: '/room',
      state: item
  })



}
const handleTagsClick=(item)=>{
  console.log(item)

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


const handleviewinar=()=>{
  
  if(itemtype === '3d'){
    history.push({
      pathname: `/view3d`,
      state: brandidnew
    })
  } else{
    history.push('/view')
  }
    
}

console.log(itemtype)
useEffect(()=>{
  axios.get(roomtypeimageurl).then(res=>{
    setRoomImage(res.data)
  }).catch(error=>{
    console.log(error)
  })
},[])

console.log(roomimage)


const tagsimages= [

  {
    tagname: 'new',
    tagimage:  newfridge
  },
  {
    tagname: 'high capacity',
    tagimage:  highcapacity
  },
  {
    tagname: 'thermal auto clean',
    tagimage: thermalclean
  },
  {
    tagname: 'baffle filter',
    tagimage: bafflefilter
  },
  {
    tagname: 'elegant style',
    
  }
]

const categoryimage= [
  {
   
    catimage: wallpaper
  },
  {
    
    catimage: curtain
  },
  {
   
    catimage: wallmurals
  },
  {
   
    catimage: woddenfloors
  },

]

const handleScroll = () => {
     let allimage= document.querySelectorAll('.imagedivtags')  
     let allimagerooms= document.querySelectorAll('.imagedivtagsrooms')
     let allimagesearch= document.querySelectorAll('.imagedivtagssearch')



     let alltoggle= document.querySelectorAll('.imagedivtagstoggle')

  if(user){
    const scrollPosition = window.scrollY; // => scroll position
    if(scrollPosition > 100){
      document.querySelector('.navbardisplay').classList.add('navbardisplaytoggle')
      document.querySelector('.categorytopcontainer').classList.add('categorytopcontainertoggle')
  
    }
    else{
  
      
      document.querySelector('.navbardisplay').classList.remove('navbardisplaytoggle')
      document.querySelector('.categorytopcontainer').classList.remove('categorytopcontainertoggle')
  
  
  
    }

    console.log(scrollPosition)
    
    if(scrollPosition > 100){
       for(let i=0; i< allimage.length; i++){
        allimage[i].classList.add('show')
       }
       for(let i=0; i< alltoggle.length; i++){
        alltoggle[i].classList.add('show')
       }
    } else{
      for(let i=0; i< allimage.length; i++){
        allimage[i].classList.remove('show')
       }
       for(let i=0; i< alltoggle.length; i++){
        alltoggle[i].classList.remove('show')
       }
    }

    if(scrollPosition > 700){
     
     
      for(let i=0; i< allimagerooms.length; i++){
        allimagerooms[i].classList.add('show')
      }
     
   } else{
     for(let i=0; i< allimagerooms.length; i++){
      allimagerooms[i].classList.remove('show')
      }
     
   }

   if(scrollPosition > 1100){
   
    
    for(let i=0; i< allimagesearch.length; i++){
      allimagesearch[i].classList.add('show')
    }
   
 } else{
   for(let i=0; i< allimagesearch.length; i++){
    allimagesearch[i].classList.remove('show')
    }
   
 }

  }
 
 

}

useEffect(() => {
  function handleContextMenu(e) {
    e.preventDefault(); 
  }
 
  const rootElement = document.getElementById('my-component');
 rootElement && rootElement.addEventListener('contextmenu', handleContextMenu);
 

  return () => {
   rootElement && rootElement.removeEventListener('contextmenu', handleContextMenu);
  };
}, []);

useEffect(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
  }, []);

   
  const  usernew = sessionStorage.getItem('user')
let uservalue;
  if(usernew && usernew.includes('data')){
     uservalue= JSON.parse(usernew)
  }
  if(usernew && !usernew.includes('data')){
    uservalue= usernew
 }
  
 

console.log(rooms)
console.log(catdata)

useEffect(()=>{
  /*
  const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slider-dots');
 slides && slides.forEach((slide, index) => {
  const dot = document.createElement('span');
  dot.classList.add('slider-dot');
  if (index === 0) {
    dot.classList.add('active');
  }
  dot.addEventListener('click', () => {
    goToSlide(index);
   
   
  
  });
  dotsContainer &&  dotsContainer.appendChild(dot);
});

let currentSlide = 0;


function nextSlide() {
  goToSlide(currentSlide + 1);
}

function goToSlide(index) {
     console.log(slides[index])
     dotsContainer.querySelector('.active').classList.remove('active');
     dotsContainer.querySelectorAll('.slider-dot')[index].classList.add('active');

  
}



*/},[])

let autoplayInterval = 3000


const goToSlide = (index) => {
  setCurrentIndex(index);
};

const goToPrevSlide = () => {
  const index = (currentIndex - 1 + images.length) % images.length;
  setCurrentIndex(index);
};

const goToNextSlide = () => {
 
  const index = (currentIndex + 1) % images.length;
  setCurrentIndex(index);
};

useEffect(() => {

  
  const autoplay = setInterval(goToNextSlide, autoplayInterval);

  return () => {
    clearInterval(autoplay);
  };
}, [currentIndex, autoplayInterval]);

const images= [

   image1,
   image2,
   image3
]

useEffect(()=>{

  const body={
    brand: brandidnew && brandidnew,
    tagName: 'new',
     tagNameTwo: 'New'
 }
     axios.post(gettagsdataurl,  body).then(res=>{

       let newval = res.data.filter((item,i)=>(
        i < 4
       )) 

       setNewTagsData(newval)
     }).catch(error=>{
      console.log(error)
     })
},[])

useEffect(()=>{

  const body={
    brand: brandidnew && brandidnew,
    tagName: 'featured',
    tagNameTwo: 'Featured'
 }

     axios.post(gettagsdataurl,  body).then(res=>{
      let newval = res.data.filter((item,i)=>(
        i < 4
       )) 

       setFeaturedTagsData(newval)
     }).catch(error=>{
      console.log(error)
     })
},[])

useEffect(()=>{

  const body={
    brand: brandidnew && brandidnew,
    tagName: 'top picks',
    tagNameTwo: 'Top seller'
 }

     axios.post(gettagsdataurl,  body).then(res=>{
      let newval = res.data.filter((item,i)=>(
        i < 4
       )) 

       setTopPicksTagsData(newval)
     }).catch(error=>{
      console.log(error)
     })
},[])

console.log(newtagsdata)
console.log(featuredtagsdata)
console.log(toppickstagsdata)

  if(typeof usernew === 'string'){

    return (
      <div>
            <Helmet>
            <title>Home | ARnxt</title>
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
           <div  className='navbardisplay'>
           <Navbar/>
            </div>
         
  
          <div className='modalhome'>
            <div className='brandmodal'>
              <img  src= {brandimage}/>
                
              </div>
              <div  className='load'>
                
              </div>
  
          </div>
  
        
          <div  className='mainbrandbody'  id= 'my-component'>
         
  
            <div className='categorytopcontainer'>
              <div className='brandcontainer'>
              <div className='brandimagecontainer'>
            <img  src={brandimage} />
  
            </div>
  
              </div>
              <div className='categoryitem'>
              {
                              catdata &&    catdata.map((item,i)=>(
                                    <label htmlFor='' >
                                      <div className='categorycontainer'> 
                                         
                                         
                                         <h3 onClick={()=>handlesubcategory(item, i)} >{item}</h3>
  
                                         
                                          
                                          
                                      </div>
                                      </label>
  
                                  ))
                                    }
               
  
              </div>
  
            </div>

          <div  className='carouselcontainer'>
            {

<div className="carousel">

<div className="carousel-images">
  {carouselimages && carouselimages.map((image, index) => (
    <img
      key={index}
      src={image}
      alt={`Slide ${index}`}
      style={index === currentIndex ? { flex: '1 0 100%', transform: `translateX( ${-100*index}%)`, transition: '2s ease' }: { flex: '1 0 100%', transform: ''}}
     
    />
  ))}
</div>

<div className="carousel-dots">
  {carouselimages && carouselimages.map((image, index) => (
    <span
      key={index}
      className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
      onClick={() => goToSlide(index)}
    />
  ))}
</div>
</div>

             /*
            
          <Carousel 
             showThumbs={true}
             showStatus={false}
             useKeyboardArrows
             transitionTime={1000}
          
          
            
            >
                <div className="">
          <img
            alt=""
            src={image1}
          />
       
        </div>
        <div className="">
          <img
            alt=""
            src={image2}
          />
      
        </div>
        <div className="">
          <img
            alt=""
            src={image3}
          />
       
        </div>
            </Carousel>
            
  */}
          </div>
          
          

  
            <div className='viewinroom'>
            <div className='itemspara'>
             <h3>Visualise Our Products In Your Space </h3>
             <span>
             <FaArrowRight  className='icondiv'/>
              </span>
  
              <div className='trybutton' >
                <button  type='button' onClick={handleviewinar}>Try In Your Room <span className='aricon'><img src={aricon}/></span> </button>
                
              </div>
            </div>
  
            </div>
          
            <div className='itemspara'>
             <h3>Visualise By Category</h3>
             <span>
             <FaArrowRight  className='icondiv'/>
              </span>
            </div>
  
        <div className=''>
          
          {
                                catdata &&  catdata.map((item,i)=>(
  
                                    
  
                                    
                                    <label htmlFor= {`check_${i}`} >
                                      <div  className='' > 
                                      <input type='checkbox'   className='checkinput' id= {`check_${i}`} value={item} onClick={()=> handlesubcategory(item,i)} />
                                           
                                            {
                                            categoryimg &&  categoryimg.map((itemnew, index)=>(
                                               itemnew.itemname === item ?
                                               <div  className= 'imagedivtags'>
                                               <img src={itemnew.itemvalue}/>
  
                                               <p  >{item}</p>
  
                                               </div>: <p></p> 
                                             ))
  
                                            }
  
                                       
                                      </div>
                                      </label>
  
                                     ))
  
                                 
  
  
                                          }
          
        </div>
        <div className='itemspara'>
             <h3>Visualise By Rooms</h3>
             <span>
             <FaArrowRight  className='icondiv'/>
              </span>
            </div>
            <div className='roomscontainer'>
            {  
                                rooms &&  rooms.map((item,i)=>(
                                    <label htmlFor={`checkroom_${i}`} >
                                      <div  className='' > 
                                      <input type='checkbox'   className='checkinput' id= {`checkroom_${i}`} value={item} onClick={()=>handleRoomsClick(item,i)} />
                                        {
                                         roomimage && roomimage.data.map( (itemnew ,j )=>(
                                             itemnew.roomname === item  ?
  
                                             <div className='imagedivtagsrooms' >
                                             <img src= {itemnew.iconurl}/>
                                             <p>{item}</p>
                                            
                                            
                                              </div>
                                             :  <div></div>
  
                                          ))
                                        }
                                         
  
                                        
                                        
                                         
                                          
                                      </div>
                                      </label>
  
                                  ))
                                       }
          
         
              
         
  
  
            </div>
            <div className='itemspara'>
             <h3>Explore the new trending products</h3>
             <span>
             <FaArrowRight  className='icondiv'/>
              </span>
            </div>
            <div className='roomscontainer'>
            {
                               
                               
                                
                                    <label htmlFor= {`checktags`} >
                                      <div  className='tagsproducts'> 
                                      <input type='checkbox'   className='checkinput' id= {`checktags`}  />
                                          
                                          {
                                         
                                              newtagsdata && newtagsdata.map((item,i)=>(
                                                <div className='imagedivtagssearch' onClick={()=>handleTagsClick(item,i)} >
                                                <img  src={item.imageurl[0]} />
                                               <p>{item.productname}</p>
                                             </div>
                                              ))
                                             
                                        
                                        
  
                                          }
                                          
                                          
                                      </div>
                                      </label>
  
                                
  
  
                            
                               
                                         }
          
         
              
         
  
  
            </div>

            <div className='itemspara'>
             <h3>Explore your most featured products</h3>
             <span>
             <FaArrowRight  className='icondiv'/>
              </span>
            </div>
            <div className='roomscontainer'>
            {
                               
                               
                                
                                    <label htmlFor= {`checktags`} >
                                      <div className='tagsproducts'> 
                                      <input type='checkbox'   className='checkinput' id= {`checktags`}  />
                                          
                                          {
                                             featuredtagsdata && featuredtagsdata.map(item=>(
                                              <div className='imagedivtagssearch' onClick={()=>handleTagsClick(item)}>
                                              <img  src={item.imageurl[0]} />
                                             <p>{item.productname }</p>
                                           </div>
                                   
                                             ))
                                             
                                       
  
                                          }
                                          
                                          
                                      </div>
                                      </label>
  
                               
  
  
                            
                               
                                         }
          
         
              
         
  
  
            </div>
            <div className='itemspara'>
             <h3>Explore your top seller products</h3>
             <span>
             <FaArrowRight  className='icondiv'/>
              </span>
            </div>
            <div className='roomscontainer'>
            {
                               
                               
                                 
                                    <label htmlFor= {`checktags`} >
                                      <div className='tagsproducts'> 
                                      <input type='checkbox'   className='checkinput' id= {`checktags`}  />
                                          
                                          { 
                                           
                                          toppickstagsdata && toppickstagsdata.map((item,i)=>(
                                            <div className='imagedivtagssearch'  onClick={()=>handleTagsClick(item,i)}>
                                            <img  src={item.imageurl[0]} />
                                           <p>{item.productname }</p>
                                         </div>
                                 
                                          ))
                                             
                                         
  
                                          }
                                          
                                          
                                      </div>
                                      </label>
  
                               
  
  
                            
                               
                                         }
          
         
              
         
  
  
            </div>
       
             
  
         
  
          
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



}

export default Brand
