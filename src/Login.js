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
import { useCookies } from 'react-cookie';


import { isMobile, isTablet, isDesktop } from 'react-device-detect';



const loginurl= 'https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/users/loginweb'
const needhelpurl= 'https://6z24cy50la.execute-api.ap-south-1.amazonaws.com/prod/needhelp'
const loginanalysisdata= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/logindata'
const sendotpuser = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/registerbranduser'
const verifyotpuser= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/verifybranduser'
const branduserlogin= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/branduserlogin'


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
    const [devicetype, setDeviceType] = useState('')
   
    const [cookies, setCookie] = useCookies(['user']);
    const [otp, setOtp] = useState(new Array(6).fill(""))
    const [username, setUserName] = useState('')
    const [useremail, setUserEmail] = useState('')
    const [userpassword, setUserPassword] = useState('')
    const [usermobile, setUserMobile] = useState('')
    const [userpin, setUserPin] = useState('')
    const [loginname, setLoginName] = useState('');
    const [loginpassword, setLoginPassword] = useState('')

    let lastId = 0;

    function getId(){
      let currentId = new Date().getTime();
      if (lastId == currentId) {
        currentId++;
      }
      lastId = currentId;
      return lastId;
  }  

  let hasTouchscreen = 'ontouchstart' in window;

  useEffect(()=>{
    
    
    if(hasTouchscreen){
      setDeviceType('Mobile')
    } else{
      setDeviceType('Desktop')
    }
   

  },[])



    function  submitHandler (){
     
         getId()
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
              
              setCookie('Name', '', { path: '/' });

              const newbody={
                Id: lastId,
                userID: res.data.data.userID,
                deviceId: '',
                devicetype: devicetype,
                source: 'Web',
                date: timestamp.toString()

              }
              axios.post(loginanalysisdata, newbody).then(res=>{
                console.log(res)
              }).catch(error=>{
                console.log(error)
              })
                
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

   const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    
    if (element.nextSibling) {
        element.nextSibling.focus();
    }
};

const handleloginclick= (e)=>{
  e.preventDefault()
  document.querySelector('.loginfields').style.display = 'block'
  document.querySelector('.inputfieldregister').style.display = 'none'

}
const handleregisterclick= (e)=>{
  e.preventDefault()
  document.querySelector('.loginfields').style.display = 'none'
  document.querySelector('.inputfieldregister').style.display = 'block'

}
const handleregister= ()=>{
   if(username ===''){
    document.querySelector('.requiredfieldname').style.display= 'block'
    return
   }else{
    document.querySelector('.requiredfieldname').style.display= 'none'
   }
   if(useremail === ''){
    document.querySelector('.requiredfieldemail').style.display = 'block'
    return
   }else{
    document.querySelector('.requiredfieldemail').style.display = 'none'
    

   }
   if(usermobile === ''){
    document.querySelector('.requiredfieldmobile').style.display = 'block'
    return
   }else{
    document.querySelector('.requiredfieldmobile').style.display = 'none'
    

   }
   if(userpassword === ''){
    document.querySelector('.requiredfieldpassword').style.display = 'block'
    return
   }else{
    document.querySelector('.requiredfieldpassword').style.display = 'none'
    

   }
   if(userpin === ''){
    document.querySelector('.requiredfieldpincode').style.display = 'block'
    return
   }else{
    document.querySelector('.requiredfieldpincode').style.display = 'none'
    

   }

   const body={
    phoneNo: usermobile
   }
   axios.post(sendotpuser, body).then(res=>{
    if(res){
      document.querySelector('.otp-field').style.display = 'block'
      document.querySelector('.inputfieldregister').style.display = 'none'
    }
  
   }).catch(error=>{
    console.log(error)
   })
  
}
const handleback= ()=>{
  document.querySelector('.otp-field').style.display = 'none'
  document.querySelector('.inputfieldregister').style.display = 'block'
}
const verifyotp= ()=>{
  const body={
    phoneNo: usermobile,
    otp: otp.join(''),
    username: username,
    useremail: useremail,
     password: userpassword,
     pin: userpin
  }
  axios.post(verifyotpuser, body).then(res=>{
    
    if(res.status === 200){
      document.querySelector('#userverifymessage').innerHTML = "Registration Successful"
      setTimeout(() => {
      document.querySelector('#userverifymessage').innerHTML = ""
        
      }, 3000);
      document.querySelector('.loginfields').style.display = 'block'
  document.querySelector('.inputfieldregister').style.display = 'none'
  document.querySelector('.otp-field').style.display = 'none'

    }
  }).catch(error=>{
    console.log(error)
  })
}
const loginhandler= ()=>{
  const body= {
    loginid: loginname,
    password: loginpassword
  }
  axios.post(branduserlogin, body).then(res=>{
     
  }).catch(error=>{
   
     if(error.response.status === 401){
      document.querySelector('#userloginmessage').innerHTML=  error.response.data
      setTimeout(() => {
      document.querySelector('#userloginmessage').innerHTML=  ''
        
      }, 3000);
     }
  })
}
console.log(userpassword)
  


const params= new URLSearchParams(window.location.search)
const newbrand = params.get('brand')
const prodpage= params.get('brandpage')
useEffect(()=>{
   if(typeof newbrand === 'string'){
    
     sessionStorage.setItem('user', newbrand)
     history.push({
      pathname: '/home',
      state: newbrand
  })
   }
   if(typeof prodpage === 'string'){
    
    sessionStorage.setItem('user', prodpage)
    history.push({
     pathname: '/view3d',
     state: prodpage
 })
  }
},[])

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
    
       <div className='logininputfields'  style={{display:'none'}} >
        <div className='loginfields'>
        <div className='logininputfieldemail'>
                    <label>Email Id / Mobile No</label>
                    <input type='text' onChange={(e)=>setLoginName(e.target.value)} />
                </div>
                <div className='logininputfieldemail'>
                    <label>Password</label>
                    <div className='inputinside'>
                    <input   type= 'password' onChange={(e)=>setLoginPassword(e.target.value)}  />
                    </div>
                   
                </div>
                <div className='submitbutton'> 
                       <div className='submitbuttoninside'>
                           <button  type='submit' onClick={loginhandler} >Login</button>
                    
                       </div>
                       <div className='loginalternate'>
                       <a href=''  onClick={handleregisterclick} > Register ? </a>
                       </div>
                    </div>
                    <div className='errorlogin'>
                    <p id='userloginmessage' style={{color:'white'}}></p>
                      </div>
                   

        </div>
       <div className='otp-field'>
                    <label>OTP</label>
                   <div className='otpfieldinput'>
                   {otp.map((data, index) => {
                        return (
                            <input
                                className=""
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                            />
                        );
                    })}
                   </div>
                      <div className='otpbuttons'>
                      <button
                            className=""
                            onClick={e => setOtp([...otp.map(v => "")])}
                        >
                            Clear
                        </button>
                        <button
                            className=""
                            onClick={verifyotp}
                        >
                            Verify OTP
                        </button>
                        <button
                            className=""
                            onClick={handleback}
                        >
                            Back
                        </button>


                      </div>
                      <div className='errorlogin'>
                    <p id='userverifymessage' style={{color:'white'}}></p>
                      </div>
                  
                </div>
                <div className='inputfieldregister' >
                <div className='logininputfieldemail'>
                    <label>Name <span className='requiredfieldname' > required * </span> </label>
                    <input type='text' onChange={(e)=> setUserName(e.target.value)} />
                </div>
                <div className='logininputfieldemail'>
                    <label>Email Id <span className='requiredfieldemail' >required *  </span></label>
                    <div className='inputinside'>
                    <input   type= 'email' onChange={(e)=> setUserEmail(e.target.value)}  />
                    </div>
                   
                </div>
                <div className='logininputfieldemail'>
                    <label>Mobile No <span className='requiredfieldmobile' > required * </span></label>
                    <div className='inputinside'>
                    <input   type= 'number' onChange={(e)=> setUserMobile(e.target.value)}  />
                    </div>
                  
                   
                </div>
                <div className='logininputfieldemail'>
                    <label>Password <span className='requiredfieldpassword' >required *  </span></label>
                    <div className='inputinside'>
                    <input   type= 'password' onChange={(e)=> setUserPassword(e.target.value)}  />
                    </div>
                  
                   
                </div>
                <div className='logininputfieldemail'>
                    <label>Pin code <span className='requiredfieldpincode' >required * </span></label>
                    <div className='inputinside'>
                    <input   type= 'number' onChange={(e)=> setUserPin(e.target.value)}  />
                    </div>
                  
                   
                </div>
          
              
                <div className='logininputbuttondiv'>
              
                    <div className='submitbutton'> 
                       <div className='submitbuttoninside'>
                           <button  type='submit' onClick={handleregister}  >Register</button>
                          

                       </div>
                       <div className='loginalternate'>
                       <a href=''  onClick={handleloginclick} > Login ? </a>
                       </div>
                      
                    </div>
                
                
                   
                </div>

                </div>
             

              </div>
       <div className='logininputfields'  >
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
