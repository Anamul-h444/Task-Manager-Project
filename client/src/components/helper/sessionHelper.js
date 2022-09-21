import { showLoader, hideLoader } from "../../redux/slice-state/loaderSlice";
import store from "../../redux/store/store";

class sessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setUserDetail(userDetail) {
    localStorage.setItem("userDetail", JSON.stringify(userDetail));
  }

  getUserDetail() {
    return JSON.parse(localStorage.getItem("userDetail"));
  }
  setEmail(Email) {
    localStorage.setItem("Email", Email);
  }
  getEmail() {
    return localStorage.getItem("Email");
  }

  setOTP(OTP) {
    localStorage.setItem("OTP", OTP);
  }
  getOTP() {
    return localStorage.getItem("OTP");
  }

  removeSessions() {
    store.dispatch(showLoader());
    localStorage.clear();
    window.location.href = "/LoginPage";
    store.dispatch(hideLoader());
  }
}
export const {
  setToken,
  getToken,
  setUserDetail,
  getUserDetail,
  removeSessions,
  setEmail,
  getEmail,
  setOTP,
  getOTP,
} = new sessionHelper();
