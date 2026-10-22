import NavBar from "./components/NavBar.jsx";
import LetterFromEditor from "./components/LetterFromEditor.jsx";
import PhotoCarousel from "./components/PhotoCarousel.jsx";
import ArticleSection from "./components/ArticleSection.jsx";
import Credits from "./components/Credits.jsx";
import sections from "./data/index.js";
import "./components/ArticleCard.css";

// Page order follows the Figma mockup (homecoming_SE.png):
// NavBar -> LetterFromEditor -> PhotoCarousel -> ArticleSections -> Credits
function App() {
  return (
    <>
      <NavBar />
      <LetterFromEditor />
      <PhotoCarousel />
      <div className="article-page-container">
        {sections.map((section) => (
          <ArticleSection
            key={section.id}
            sectionTitle={section.title}
            articles={section.articles}
          />
        ))}
      </div>
      <Credits />
    </>
  );
}

export default App;
