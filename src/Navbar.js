import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Navbar = () => {

  const [logoutdisplay, setLogoutDisplay] = useState(false);
  const history= useHistory();


  const logoutHandler=()=>{
    history.push('/')

  }






 
  return (
    
    <div>
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
      
    </div>
  )
}

export default Navbar
