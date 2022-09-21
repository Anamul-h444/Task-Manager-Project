import React, { Fragment, useRef } from "react";
import "../../assets/css/login.css";
import { FaAccusoft } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  isEmpty,
  isEmail,
  successsToast,
  errorToast,
} from "../helper/FormHelper";
import { ToastContainer } from "react-toastify";
import { LoginRequest } from "../../api-services/Api-services";
import { useNavigate } from "react-router-dom";

function Login() {
  let navige = useNavigate();
  let emailRef,
    passwordRef = useRef();

  const loginHandler = () => {
    let email = emailRef.value;
    let password = passwordRef.value;

    console.log(email, password);

    if (isEmail(email)) {
      errorToast("Input valid Email!");
    } else if (isEmpty(password)) {
      errorToast("Required Password!");
    } else {
      LoginRequest(email, password).then((result) => {
        if (result === true) {
          setTimeout(()=>{
            window.location.href="/"
          }, 1000)
         
        }
      });
    }
  };

  return (
    <Fragment>
      <div className="login-container">
        <div className="proj-name">
          <h4>Task Manager</h4>
          <FaAccusoft className="login-icon" />
        </div>
        <div className="login-header">
          <h5>Sign In</h5>
        </div>
        <form>
          <div>
            <input
              ref={(input) => (emailRef = input)}
              type="email"
              className="myInput"
              placeholder="User Email"
            />
          </div>
          <div>
            <input
              ref={(input) => (passwordRef = input)}
              type="password"
              className="myInput"
              placeholder="User Password"
            />
          </div>
          <div>
            <input
              onClick={loginHandler}
              type="button"
              className="login-btn"
              value="Next"
            />
          </div>
        </form>
        <div className="sign-for">
          <Link to="/RegistrationPage">
            <span className="sign">Sign Up</span> <br />{" "}
          </Link>
          <Link to="/SendOTP">
            <span className="forget">Forget Password</span>
          </Link>
        </div>
      </div>
     <ToastContainer />
    </Fragment>
  );
}

export default Login;
