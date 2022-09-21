import React, {useRef} from 'react'
import { ToastContainer } from 'react-toastify';
import '../../assets/css/registration.css'
import {isEmpty,isEmail,isMobile, successsToast, errorToast} from '../helper/FormHelper'
import {RegistrationRequest} from '../../api-services/Api-services'
import {useNavigate} from 'react-router-dom'


function Registration() {
  let emailRef,firstNameRef, lastNameRef, mobileRef, passwordRef = useRef();
  let navigate = useNavigate();
  
const onRegistration =() => {
  /*.......... Data Receive from form............ */
  let email = emailRef.value;
  let firstname = firstNameRef.value;
  let lastName=lastNameRef.value;
  let mobile = mobileRef.value;
  let password = passwordRef.value;
  let photo =""
 
 /*.......... Form Validation............ */
  if(isEmail(email)){
    errorToast("Valid Email Required !")
  }else if(isEmpty(firstname)){
    errorToast("First Name is Required !")
  }else if(isEmpty(lastName)){
    errorToast("Last Name is Required !")
  }else if(isMobile(mobile)){
    errorToast("Valid Mobile No Required !")
  } else if (isEmpty(password)){
    errorToast("Password is Required !")
  }else{
    RegistrationRequest(email, firstname, lastName, mobile, password,photo).then((result)=>{
      if(result===true){
       setTimeout(()=>{
        navigate('/LoginPage')
       }, 1000)
      }
    })
  }
 } 

  return (
    <div>
      <div className='reg-container'>
        <div className='myCard'>
          <div className='form'>
            <header>Sign Up</header>

            <div className='form-group'>
              <input ref={(input)=>emailRef=input} type="email" className='form-control mt-4 reg-input' id='email' placeholder='User Email' required />
            </div>

            <div className='form-group'>
              <input ref={(input)=>firstNameRef=input} type="text" className='form-control mt-4 reg-input' id='fName' placeholder='First Name' required />
            </div>

            <div className='form-group'>
              <input ref={(input)=>lastNameRef=input} type="text" className='form-control mt-4 reg-input' id='lName' placeholder='Last Name' required />
            </div>

            <div className='form-group'>
              <input ref={(input)=>mobileRef=input} type="text" className='form-control mt-4 reg-input' id='mobile' placeholder='mobile' required />
            </div>


            <div className='form-group'>
              <input ref={(input)=>passwordRef=input} type="password" className='form-control mt-4 reg-input' id='password' placeholder='Password' required />
            </div>

         <input onClick={onRegistration} type="button" value="Next" className='btn reg-btn mt-4' />
         <ToastContainer />
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default Registration