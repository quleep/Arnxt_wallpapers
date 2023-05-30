import React, { useEffect, useState } from 'react'
import { FaHamburger, FaHeart } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'

const Navbar = () => {

  const [logoutdisplay, setLogoutDisplay] = useState(false);
  const history= useHistory();


  const logoutHandler=()=>{
    history.push('/')

  }






 
  return (
    
    <div>

      <div>
      <nav class="navbar  fixed-top navbar-expand-lg py-4  navbar-light "  style={{backgroundColor:'rgb(45, 45, 146)'}}>
  <div class="container">
    <a class="navbar-brand" href="#" style={{color:'white'}} >ARnxt</a>
    <button class="navbar-toggler" type="button" style={{color:'white'}} data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon "  ></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" style={{color:'white'}} href="/home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"></a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"></a>
        </li>
      </ul>
      <form class="d-flex">
     
        <button class="btn btn-outline-success" type="submit"  onClick={logoutHandler}>Logout</button>
      </form>
    </div>
  </div>
</nav>
      </div>
       {

       /*
      <nav className='navbarnew'>
        <a>Logo</a>
        <input type='checkbox' id='toggler'  />
         <label htmlFor='toggler'   > <FaHamburger/> </label>
         <div className='menu'>
          <ul className='list'>
            <li><a href='#'>HOme</a></li>
            <li><a href='#'>HOme</a></li>
            <li><a href='#'>HOme</a></li>
            <li><a href='#'>HOme</a></li>


          </ul>

         </div>

      </nav>
       }
   {

      
  <nav class="navbar navbar-expand-lg "  style={{backgroundColor:'rgb(45, 45, 146)', height:'80px'}}>
  <div class="container">
    <a class="navbar-brand" href="#">ARnxt</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/home">Home</a>
        </li>
     
      </ul>
      <span class="navbar-text">
         <button onClick={logoutHandler} >Logout</button>
      </span>
    </div>
  </div>
</nav>
   */}
    </div>
  )
}

export default Navbar
