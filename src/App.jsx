import NavBar from "./components/NavBar.jsx";
import Credits from "./components/Credits.jsx";

// Page order follows the Figma mockup (homecoming_SE.png):
// NavBar -> LetterFromEditor -> PhotoCarousel -> ArticleSections -> Credits
function App() {
  return (
    <>
      <NavBar />
      <Credits />
    </>
  );
}

export default App;
