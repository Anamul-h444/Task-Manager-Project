import { Fragment } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from './pages/DashboardPage'
import CanceledPage from './pages/CanceledPage'
import LoginPage from './pages/LoginPage'
import NewPage from './pages/NewPage'
import Page404 from './pages/Page-404'
import ProfilePage from './pages/ProfilePage'
import ProgressPage from './pages/ProgressPage'
import RegistrationPage from './pages/RegistrationPage'
import CompletedPage from './pages/CompletedPage'
import CreatePage from './pages/CreatePage'
import FullscreenLoader from "./components/MasterLayout/FullScreenLoader";
import {getToken} from '../src/components/helper/sessionHelper'
import SendOtpPage from '.././src/pages/RecoverPasswordPage/SendOtpPage'
import VerifyOtpPage from '.././src/pages/RecoverPasswordPage/VerifyOtpPage'
import CreatePasswordPage from '.././src/pages/RecoverPasswordPage/CreatePasswordPage'


function App() {
  if(getToken()){
    return (
      <Fragment >
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<DashboardPage />} />
            <Route exact path="/CompletedPage" element={<CompletedPage />} />
            <Route exact path="/CreatePage" element={<CreatePage />} />
             <Route exact path="/NewPage" element={<NewPage />} />
            <Route exact path="/ProfilePage" element={<ProfilePage />} />
            <Route exact path="/ProgressPage" element={<ProgressPage />} />
            <Route exact path="/CanceledPage" element={<CanceledPage />} />
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
      </Fragment>
    );
  }else{
    return (
      <Fragment >
        <BrowserRouter>
          <Routes>
           <Route path="/" element={<Navigate to="/LoginPage" replace />}/>
            <Route exact path="/LoginPage" element={<LoginPage />} />
            <Route exact path="/Page404" element={<Page404 />} />
            <Route exact path="/RegistrationPage" element={<RegistrationPage />} />
            <Route path="*" element={<Page404/>}/>
            <Route exact path="/CreatePassword" element={<CreatePasswordPage/>} />
            <Route exact path="/VerifyOTP" element={<VerifyOtpPage/>} />
            <Route exact path="/SendOTP" element={<SendOtpPage />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
      </Fragment>
    );
  }
}

export default App;


