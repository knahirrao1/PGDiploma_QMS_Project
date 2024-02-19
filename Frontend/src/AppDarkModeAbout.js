import "./App.css";
// import About from "./components/About";
import NavBar from "./components/NavBar";
import TextForm from "./components/TextForm";
function App() {
  //to access title and AboutMe properties
  return (
    <>
      <NavBar title="Text Utils" AboutMe="Tell me about yourself" />;
      <div className="container">
        <TextForm heading="Crazy Blogs" />
        {/* <About aboutTitle="About Me" /> */}
      </div>
    </>
  );
}

export default App;
