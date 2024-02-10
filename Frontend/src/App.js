import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HeaderNav from "./components/HeaderNav";
import StaticHomePage from "./components/AboutUs";
import DynamicHomePage from "./components/DynamicHomePage";
import FooterNav from "./components/FooterNav";
import Login from "./components/SignIn";
import Module from "./components/ModuleList";
import QuizeList from "./components/QuizList";
import CreateNew from "./components/CreateNew";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./components/ForgotPassword";
import ModuleCreation from "./components/ModuleCreation";
import QuizCreation from "./components/QuizCreation";
import QuestionCreation from "./components/QuestionCreation";

function App() {
  return (
    <>
      <Router>
        <HeaderNav />
        <Routes>
          <Route path="/" element={<DynamicHomePage />} />
          <Route path="/AboutUs" element={<StaticHomePage />} />
          <Route path="/ModuleList" element={<Module />} />
          <Route path="/QuizList" element={<QuizeList />} />
          <Route path="/CreateNew" element={<CreateNew />} />

          {/* Rahuls code */}
          <Route path="/SignIn" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />

          {/* piyush code */}
          <Route path="/ModuleCreation" element={<ModuleCreation />} />
          <Route path="/QuizCreation" element={<QuizCreation />} />
          <Route path="/QuestionCreation" element={<QuestionCreation />} />
        </Routes>
        <FooterNav />
      </Router>
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
    </>
  );
}

export default App;
