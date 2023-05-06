import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Navbarmain from './Navbarmain'

const loginurl= 'https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/users/loginweb'

const Login = () => {

    const history= useHistory();


    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userdata, setUserData] = useState();

    const submitHandler=(e)=>{

        if(userid === ''){
            document.querySelector('#loginmessage').innerHTML='loginid required'
            setTimeout(() => {
                document.querySelector('#loginmessage').innerHTML=''
    
                    
                }, [3000]);
            return
         

        }
        if(password === ''){
            document.querySelector('#loginmessage').innerHTML='password required'
            setTimeout(() => {
                document.querySelector('#loginmessage').innerHTML=''
    
                    
                }, [3000]);
            return
        }
        e.preventDefault()

        const body={
            loginid: userid,
            password: password
        }

        axios.post(loginurl, body).then(res=>{
            if(res.status === 200){
                sessionStorage.setItem('user', JSON.stringify(res.data))

               
                history.push('/wallpapers')

            }
        }).catch(error=>{
          if(error){
          
            document.querySelector('#loginmessage').innerHTML= error.response.data.Message
            setTimeout(() => {
            document.querySelector('#loginmessage').innerHTML=''

                
            }, [3000]);

          }
        })
    }

  return (
    <div>
       <Navbarmain/>
       <Footer/>

       <div  className='logincontainer'> 
       <div className='loginbox'>

        <div className='logindiv1' >
            <label>Login Id</label>
            <input type='text' onChange={(e)=>setUserId(e.target.value)} />
        </div>
        <div className='logindiv2' >
            <label>Password</label>
            <input type='password'onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className='logindiv3'>
            <button type='submit'  onClick={submitHandler}>Login</button>

        </div>
        <p style={{color:'red', fontFamily:'monospace', fontSize:'20px'}} id= 'loginmessage'></p>


       </div>

       </div>
      
    </div>
  )
}

export default Login
