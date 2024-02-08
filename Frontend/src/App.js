import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HeaderNav from "./components/HeaderNav";
import StaticHomePage from "./components/AboutUs";
import DynamicHomePage from "./components/DynamicHomePage";
import FooterNav from "./components/FooterNav";
import Login from "./components/SignIn";
import Module from "./components/ModuleList";
function App() {
  return (
    <>
      <Router>
        <HeaderNav />
        <Routes>
          <Route path="/" element={<DynamicHomePage />} />
          <Route path="/AboutUs.js" element={<StaticHomePage />}></Route>
          <Route path="/SignIn.js" element={<Login />} />
          <Route path="/ModuleList.js" element={<Module />} />
        </Routes>
        <FooterNav />
      </Router>
    </>
  );
}

export default App;
