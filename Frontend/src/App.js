// import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./components/auth/SignIn";
import { Route, Routes } from "react-router-dom";
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
import Response from "./components/response/Response";
import QuizList from "./components/quizzes/QuizList";
import Prompt from "./components/quizzes/Prompt";
import Quiz from "./components/quizzes/Quiz";
import ModulesTable from "./components/modules/ModulesTable";
import ModulesEdit from "./components/modules/ModulesEdit";
import QuizzesTable from "./components/quizzes/QuizzesTable";
import QuestionsTable from "./components/questions/QuestionsTable";
import QuizEdit from "./components/quizzes/QuizEdit";
import UserTable from "./components/user/UserTable";
import QuizPerformance from "./components/response/QuizPerformance";

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
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/create-new" element={<CreateNew />} />
        {/* <Route path="/profile" element={<ProfileEdit />} /> */}

        <Route path="/quiz-list" element={<ModuleList />} />
        <Route path="/response" element={<Response />} />
        <Route path="/quiz-list/:module_id" element={<QuizList />} />
        <Route path="/prompt/:id" element={<Prompt />} />
        <Route path="/questions/:id/:username" element={<Quiz />} />
        {/* rahuls routs */}
        <Route path="/manage-content" element={<ModulesTable />} />
        <Route path="/manage-user" element={<UserTable />} />
        <Route path="/quiz-list/:module_id" element={<QuizList />} />
        <Route path="/prompt/:id" element={<Prompt />} />
        <Route path="/questions/:id/:username" element={<Quiz />} />
        <Route path="/manage-content" element={<ModulesTable />} />
        <Route path="/edit-module/:id" element={<ModulesEdit />} />
        <Route path="/quiz-table/:id" element={<QuizzesTable />} />
        <Route path="/question-table" element={<QuestionsTable />} />
        <Route path="/edit-quiz/:id" element={<QuizEdit />} />
        <Route path="/manage-user" element={<UserTable />} />
        <Route
          path="/quiz-performance/:openToGuest/:id"
          element={<QuizPerformance />}
        />
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
