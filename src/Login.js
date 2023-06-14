import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Navbarmain from './Navbarmain'
import GoogleAnalytics from './GoogleAnalytics'
import { FaArrowRight, FaCross, FaEye, FaEyeSlash, FaTimes, FaTimesCircle, FaUser } from 'react-icons/fa'
import arnxtlogo from '../src/images/arnxtlogo.png';
import loginimage from '../src/images/loginimage.png';



const loginurl= 'https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/users/loginweb'
const needhelpurl= 'https://6z24cy50la.execute-api.ap-south-1.amazonaws.com/prod/needhelp'

const Login = () => {

    const gaEventTracker = GoogleAnalytics('Login');

    const history= useHistory();


    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userdata, setUserData] = useState();
    const [passwordtype, setPasswordType]  = useState('password') 
    const [dropdownvalue, setDropDownValue] = useState('')
    const [otherselect, setOtherSelect] = useState(false)
    const [otherdetails, setOtherDetails] = useState('')
    const [companyname, setCompanyName] = useState('')
    const [emailid, setEmailId] = useState('')

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

    useEffect(()=>{
      if(dropdownvalue === 'others'){
        setOtherSelect(true)
       
      }
     if(dropdownvalue === 'Sign in not allowed' || dropdownvalue === 'Forgot Password'){
      setOtherSelect(false)
     }
   
    
    },[dropdownvalue])

  const timestamp = new Date().getTime()
   const submitform= ()=>{

    if(companyname === ''){
      document.querySelector('#needhelpmessage').innerHTML= 'Company name required'
      setTimeout(() => {
        document.querySelector('#needhelpmessage').innerHTML= ''
          
        }, 3000);
      return
     

    }
    if(emailid === ''){
      document.querySelector('#needhelpmessage').innerHTML= 'Emailid required'
      setTimeout(() => {
        document.querySelector('#needhelpmessage').innerHTML= ''
          
        }, 3000);
      return

    }
    if(dropdownvalue === ''){
      document.querySelector('#needhelpmessage').innerHTML= 'Please select and issue'
      setTimeout(() => {
        document.querySelector('#needhelpmessage').innerHTML= ''
          
        }, 3000);
      return

    }
    const body={
       issue_id: timestamp.toString(),
       company_name: companyname,
       email_id: emailid,
       issues_encountered: dropdownvalue
    }
    axios.post(needhelpurl, body).then(res=>{
      if(res.status === 200){
        document.querySelector('#needhelpmessage').innerHTML= 'Submitted Successfully'
        setTimeout(() => {
        document.querySelector('#needhelpmessage').innerHTML= ''
          
        }, 3000);
      }
    }).catch(error=>{
      console.log(error)
    })
   }

   const openHelpPopup=()=>{
    document.querySelector('.loginmaincontainer').classList.add('popupopen')
    document.querySelector('.needhelppopup').style.display= 'block'
   }
   const closeHelpPopup=()=>{
    document.querySelector('.loginmaincontainer').classList.remove('popupopen')

    document.querySelector('.needhelppopup').style.display= 'none'

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
                      <p>Need help ?</p><FaArrowRight onClick={openHelpPopup} style={{cursor:'pointer'}} className='rightarrow'/>
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
              <p style={{color:'red', fontFamily:'Lato, sans-serif', fontSize:'20px'}} id= 'loginmessage'></p>
                </div>
                     </div>

                   </div>
                </div>
       </div>

   

       <div className='needhelppopup'> 
       <div className='closepopuplogin' onClick={closeHelpPopup}>
          <FaTimesCircle  style={{color:'red', fontSize:'20px'}}/>
       </div>
       <div>
       <div className='logininputfields'>
                <div className='logininputfieldemail'>
                    <label>Company Name</label>
                    <input type='text' onChange={(e)=>setCompanyName(e.target.value)}/>
                </div>
                <div className='logininputfieldemail'>
                    <label>Email Id</label>
                    <div className='inputinside'>
                    <input   type= 'email' onChange={(e)=>setEmailId(e.target.value)}  />
               


                    


                    </div>
                   
                </div>
                <div className='logininputfieldemail'>
                    <label>Issue</label>
                    <div className='issuedropdown'>
                    <select onChange={(e)=>setDropDownValue(e.target.value)}  >
                    <option  style={{display:'none'}}>choose...</option>

                      <option value= 'Sign in not allowed'>Sign in not allowed</option>
                      <option value= 'Forgot Password'>Forgot Password</option>
                      <option value='others'>Others</option>


                    </select>
                    </div>
                  
                   
                </div>
                <div style={otherselect ? {display:'block'}: {display:'none'}}>
                <div className='logininputfieldemail'>
                    <label>Issue</label>
                    <div className='inputinside'>
                    <input   type= 'text'  onChange={(e)=>setDropDownValue(e.target.value)}  />
               


                    


                    </div>
                   
                </div>

                </div>
              
                <div className='logininputbuttondiv'>
              
                    <div className='submitbutton'> 
                       <div className='submitbuttoninside'>
                           <button  type='submit' onClick={submitform}  >Submit</button>
                       </div>
                    </div>
                    <div className='helpmessage'>
                    <p style={{color:'white', fontSize:'20px', fontFamily:'Lato, sans-serif'}}  id= 'needhelpmessage'></p>
                      
                    </div>
                   
                </div>

              </div>
       </div>

       </div>

       </div>

     
      
    </div>
  )
}

export default Login
