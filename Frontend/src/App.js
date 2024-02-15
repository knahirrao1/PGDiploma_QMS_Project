// import SignUp from "./component/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./component/auth/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./component/auth/SignUp";
import ForgotPassword from "./component/auth/ForgotPassword";
import HeaderNav from "./component/layout/HeaderNav";
import DynamicHomePage from "./component/layout/DynamicHomePage";
import UserDashboard from "./component/user/UserDashboard";
import CreatorDashboard from "./component/creator/CreatorDashboard";
import FooterNav from "./component/layout/FooterNav";
import SignOut from "./component/auth/SignOut";
import ModuleList from "./component/modules/ModuleList";
import AboutUs from "./component/layout/AboutUs";
import CreateNew from "./component/creator/CreatorDashboard";
//import PrivateRoute from './component/auth/PrivateRoute';

function App() {
  return (
    <>
      <HeaderNav />

      <Routes>
        <Route path="/" element={<DynamicHomePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route element={<PrivateRoute/>}> */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<CreatorDashboard />} />
        {/* </Route> */}
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/module-list" element={<ModuleList />} />
        {/* navbar */}
        <Route path="/module-list" element={<ModuleList />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/create-new" element={<CreateNew />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <FooterNav />
    </>
  );
}

export default App;
