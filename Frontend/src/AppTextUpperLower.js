import "./App.css";
import NavBar from "./components/NavBar";
import TextForm from "./components/TextForm";
function App() {
  //to access title and AboutMe properties
  return (
    <>
      <NavBar title="My Title" AboutMe="Tell me about yourself" />;
      <div className="container">
        <TextForm heading="Crazy Blogs" />
      </div>
    </>
  );
}

export default App;
