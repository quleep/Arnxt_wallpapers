import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Navbarmain from './Navbarmain'
import GoogleAnalytics from './GoogleAnalytics'
import { FaArrowRight, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import arnxtlogo from '../src/images/arnxtlogo.png';
import loginimage from '../src/images/loginimage.png';



const loginurl= 'https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/users/loginweb'

const Login = () => {

    const gaEventTracker = GoogleAnalytics('Login');

    const history= useHistory();


    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userdata, setUserData] = useState();
    const [passwordtype, setPasswordType]  = useState('password') 

    function  submitHandler (){

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
       

        const body={
            loginid: userid,
            password: password
        }

        axios.post(loginurl, body).then(res=>{
            if(res.status === 200){
                console.log(res.data)
                sessionStorage.setItem('user', JSON.stringify(res.data))

               
                history.push('/home')

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
    const passwordToggle =()=>{

        if(passwordtype === 'password'){
            setPasswordType('text')
        }
        else{
            setPasswordType('password')
        }
    }
  return (
    <div>
     
       <div className='loginmainbody'>
       <div  className='loginmaincontainer'>
       <div className='loginimagediv'>
                  <div className='loginimagecontainer'>
                    <div className='loginimagecontainerinside'>
                     <div className='loginlogodiv'>
                       <div className='loginlogodivinside'>
                        <div className='arnxtlogocontainer'>
                        <img src={arnxtlogo}/>
                        </div>
                          
                       </div>
                     </div>
                     <div className='logindisplaydiv'>
                        <div className='logindisplaydivinside'>
                           <img src={loginimage}/>
                        </div>

                     </div>
                    </div>

                  </div>
                </div>
                <div className='logindetailsdiv'>
                   <div className='logininput'>
                     <div className='loginiteminside'>
                       <div className='loginicon'>
                      <div className='loginiconinside'>
                        <h4>Login</h4> < FaUser className='loginiconimage'/>
                      </div>
                      <div className='loginiconpara'>
                         <p>Welcome to partner account</p>
                      </div>
             </div>
             <div className='logininputfields'>
                <div className='logininputfieldemail'>
                    <label>Login ID</label>
                    <input type='text' onChange={(e)=>setUserId(e.target.value)}/>
                </div>
                <div className='logininputfieldemail'>
                    <label>Password</label>
                    <div className='inputinside'>
                    <input   type= {passwordtype}  value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <FaEyeSlash className= { passwordtype === 'password' ? 'eyesymbol': 'eyedisplay'} onClick={passwordToggle} />
                    <FaEye className= { passwordtype === 'text' ? 'eyesymbol' : 'eyedisplay'} onClick={passwordToggle} />


                    


                    </div>
                   
                </div>
                <div className='logininputbuttondiv'>
                    <div className='needhelpcontainer'> 
                    <div className='needhelpinside'>
                      <p>Need help ?</p><FaArrowRight className='rightarrow'/>
                    </div>

                    </div>
                    <div className='submitbutton'> 
                       <div className='submitbuttoninside'>
                           <button  type='submit'  onClick ={ ()=> { submitHandler() ; gaEventTracker('Login');}  } >Login</button>
                       </div>
                    </div>
                   
                </div>

              </div>
              <div className='loginbutton'>
              <p style={{color:'red', fontFamily:'monospace', fontSize:'20px'}} id= 'loginmessage'></p>
                </div>
                     </div>

                   </div>
                </div>
       </div>

       <div  className='logincontainer'  style={{display:'none'}}> 
       <div className='loginbox'>
       <div className='logodiv'>
            <div className='logoimagelogin'>
           

            </div>
       </div>
        <div className='logindiv1' >
            <label>Login Id</label>
            <input type='text' onChange={(e)=>setUserId(e.target.value)} />
        </div>
        <div className='logindiv2' >
            <label>Password</label>
            <input type='password'onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className='logindiv3'>
            <button type='submit'  onClick ={ ()=> { submitHandler() ; gaEventTracker('Login');}  }>Login</button>

        </div>
      


       </div>

       </div>

       </div>

     
      
    </div>
  )
}

export default Login
