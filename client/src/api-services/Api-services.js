import { successsToast, errorToast } from "../components/helper/FormHelper";
import axios from "axios";
import { showLoader, hideLoader } from "../redux/slice-state/loaderSlice";
import {
  setNewTask,
  setProgressTask,
  setCancelTask,
  setCompleteTask,
} from "../redux/slice-state/taskSlice";
import { countStatus } from "../redux/slice-state/summarySlice";
import store from "../redux/store/store";
import {
  setToken,
  getToken,
  setUserDetail,
  setEmail,
  setOTP
} from "../components/helper/sessionHelper";
import { setProfile } from "../redux/slice-state/profileSlice";
import {SuccessToast} from '../components/helper/toaster'


let BaseURL = "http://localhost:5000/api/v1/";

export function LoginRequest(email, password) {
  store.dispatch(showLoader());
  let URL = BaseURL + "/loginUser";
  let PostBody = { email: email, password: password };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        console.log(res.data.token);
        setToken(res.data.token);
        setUserDetail(res.data["data"]);
        successsToast("Login Success");
        return true;
      } else {
        errorToast("Invalid Email or Password");
        return false;
      }
    })
    .catch((err) => {
      errorToast("Something Went Wrong");
      store.dispatch(hideLoader());
      return false;
    });
}

export function RegistrationRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  store.dispatch(showLoader());
  let URL = BaseURL + "/regestrationUser";
  let postBody = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    password: password,
    photo: photo,
  };

  return axios
    .post(URL, postBody)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        if (res.data["status"] === "fail") {
          if (res.data["data"]["keyPattern"]["email"] === 1) {
            errorToast("Email Already Exist");
            return false;
          } else {
            errorToast("Something Went Wrong");
            return false;
          }
        } else {
          successsToast("Registration Success");
          return true;
        }
      } else {
        errorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((error) => {
      store.dispatch(hideLoader());
      errorToast("Something went wrong!");
      return false;
    });
}

export function CreateTask(title, description) {
  store.dispatch(showLoader());
  let URL = BaseURL + "/createTask";
  let postBody = { title: title, description: description, status: "new" };
  const AxiosHeader = { headers: { token: getToken() } };
  console.log(AxiosHeader);

  return axios
    .post(URL, postBody, AxiosHeader)
    .then((res) => {
      //console.log(res);
      if (res.status === 200) {
        store.dispatch(hideLoader());
        SuccessToast("Task Create Successful!");
        return true;
      } else {
        errorToast("Something went wrong!");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      errorToast("Something went wrong!");
      return false;
    });
}

export function TaskListByStatus(status) {
  store.dispatch(showLoader());
  let URL = BaseURL + "/listTaskByStatus/" + status;
  const AxiosHeader = { headers: { token: getToken() } };

  axios
    .get(URL, AxiosHeader)
    .then((res) => {
      //console.log("api:", res);
      store.dispatch(hideLoader());
      if (res.status === 200) {
        if (status === "new") {
          store.dispatch(setNewTask(res.data["data"]));
        } else if (status === "cancel") {
          store.dispatch(setCancelTask(res.data["data"]));
        } else if (status === "complete") {
          store.dispatch(setCompleteTask(res.data["data"]));
        } else if (status === "progress") {
          store.dispatch(setProgressTask(res.data["data"]));
        }
      } else {
        errorToast("Something went wrong!");
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      errorToast("Something went wrong!");
    });
}

export function statusSummary() {
  store.dispatch(showLoader());
  let URL = BaseURL + "/countStatus";
  const AxiosHeader = { headers: { token: getToken() } };

  axios
    .get(URL, AxiosHeader)
    .then((res) => {
      //console.log("summary API:", res);
      store.dispatch(hideLoader());
      if (res.status === 200) {
        store.dispatch(countStatus(res.data["data"]));
      } else {
        errorToast("Something went wrong!");
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      errorToast("Something went wrong!");
    });
}

export function deleteTask(id) {
  store.dispatch(showLoader());
  let URL = BaseURL + "/deleteTask/" + id;
  const AxiosHeader = { headers: { token: getToken() } };

  return axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        successsToast("Delete Success!");
        return true;
      } else {
        errorToast("Something went wrong!");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      errorToast("Something went wrong!");
      return false;
    });
}

export function updateStatusRequest(id, status) {
  store.dispatch(showLoader());
  let URL = BaseURL + "/updateStatus/" + id + "/" + status;
  const AxiosHeader = { headers: { token: getToken() } };

  return axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        successsToast("Status Upadte Success!");
        return true;
      } else {
        errorToast("Something went wrong!");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      errorToast("Something went wrong!");
      return false;
    });
}

export function profileRequest() {
  store.dispatch(showLoader());
  let URL = BaseURL + "profileDetails";
  const AxiosHeader = { headers: { token: getToken() } };

  axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());
      //console.log(res.data['data'][0])
      store.dispatch(setProfile(res.data["data"][0]));
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      errorToast("Something went wrong!");
    });
}

export function ProfileUpdateRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  store.dispatch(showLoader());

  let URL = BaseURL + "/updateProfile";
  const AxiosHeader = { headers: { token: getToken() } };
  let PostBody = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    password: password,
    photo: photo,
  };
  let UserDetails = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    photo: photo,
  };

  return axios
    .post(URL, PostBody, AxiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        successsToast("Profile Update Success");
        setUserDetail(UserDetails);
        return true;
      } else {
        errorToast("Something Went Wrong");
        return false;
      }
    })
    .catch((err) => {
      errorToast("Something Went Wrong");
      store.dispatch(hideLoader());
      return false;
    });
}

/* ........Email Varification and then Send OTP........... */
export function emailVarificationAndSendOTP(email) {
  store.dispatch(showLoader());
  let URL = BaseURL + "/emailVarificationAndSendOTP/" + email;
 
  return axios
    .get(URL)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200){
        if(res.data['status']==="fail"){
          errorToast("No user found");
          return false;
      }
      else{
          setEmail(email)
          successsToast("A 6 Digit verification code has been sent to your email address. ");
          return true;
      }
      }else{
        errorToast("Something Went Wrong");
         return false;
      } 
    })
    .catch((err) => {
      errorToast("Something Went Wrong");
      store.dispatch(hideLoader());
      return false;
    });
}

export function verifyOtpRequest(email, otp) {
  store.dispatch(showLoader());
  let URL = BaseURL + "/RecoverVerifyOTP/" + email + "/" + otp;
 
 return axios.get(URL)
  .then((res)=>{
    store.dispatch(hideLoader());
    if(res.status===200){
      if(res.data['status']==="fail"){
        errorToast(res.data['data']);
        return false;
    }
    else{
        setOTP(otp)
        successsToast("Code Verification Success");
        return true;
    }
    }else{
      errorToast("Something Went Wrong");
      return false; 
    }

  })
  .catch((err)=>{
    errorToast("Something Went Wrong");
    store.dispatch(hideLoader());
    return false;
  })
}

export function RecoverResetPassRequest(email,otp,password){
  store.dispatch(showLoader())
  let URL=BaseURL+"/RecoverResetPass";
  let PostBody={email:email,otp:otp,password:password}

  return axios.post(URL,PostBody).then((res)=>{
    console.log(res)
      store.dispatch(hideLoader())
      if(res.status===200){

          if(res.data['status']==="fail"){
              errorToast(res.data['data']);
              return false;
          }
          else{
              setOTP(otp)
              successsToast("NEW PASSWORD CREATED");
              return true;
          }
      }
      else{
          errorToast("Something Went Wrong")
          return false;
      }
  }).catch((err)=>{
      errorToast("Something Went Wrong")
      store.dispatch(hideLoader())
      return false;
  });
}
