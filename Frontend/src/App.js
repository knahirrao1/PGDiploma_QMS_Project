// import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./components/auth/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import HeaderNav from "./components/layout/HeaderNav";
import DynamicHomePage from "./components/layout/DynamicHomePage";
import UserDashboard from "./components/user/UserDashboard";
import CreatorDashboard from "./components/creator/CreatorDashboard";
import FooterNav from "./components/layout/FooterNav";
import SignOut from "./components/auth/SignOut";
import ModuleList from "./components/modules/ModuleList";
import AboutUs from "./components/layout/AboutUs";
import CreateNew from "./components/creator/CreatorDashboard";
//import PrivateRoute from './components/auth/PrivateRoute';
import ProfileEdit from "./components/layout/ProfileEdit";

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
        <Route path="/profile" element={<ProfileEdit />} />
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
      <hr></hr>
      <FooterNav />
    </>
  );
}

export default App;
