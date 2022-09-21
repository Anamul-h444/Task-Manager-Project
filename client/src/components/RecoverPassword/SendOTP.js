import React, { Fragment, useRef } from "react";
import { isEmail, errorToast } from "../helper/FormHelper";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { emailVarificationAndSendOTP } from "../../api-services/Api-services";

function SendOTP() {
  const navigate = useNavigate();
  let emailRef = useRef();
  const onRegistration = () => {
    let email = emailRef.value;
    //console.log(email);
    if (isEmail(email)) {
      errorToast("Valid Email is Required!");
    } else {
      emailVarificationAndSendOTP(email)
      .then((result)=>{
        if (result===true){
          navigate('/VerifyOTP')
        }
      })
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-100%  p-4">
              <div className="card-body">
                <h4>EMAIL ADDRESS</h4>
                <br />
                <label>Your email address</label>
                <input
                  ref={(input) => (emailRef = input)}
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <input
                  onClick={onRegistration}
                  value="Next"
                  type="button"
                  className="btn w-100 animated fadeInUp float-end btn-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
}

export default SendOTP;
