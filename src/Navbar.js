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
        <div className='navbar' >

            <div className='navbarinside' >

            <a>Home</a>
           <a>Brands</a>
           <a>Wallpapers</a>

          


         
                
                
                </div> 
                <div className='logoutcontainer'>


                  <a onClick={logoutHandler} id='logoutdiv'>Logout</a>
                </div>
               
          
            

        </div>
      
    </div>
  )
}

export default Navbar
