import NavBar from "./components/NavBar.jsx";
import LetterFromEditor from "./components/LetterFromEditor.jsx";
import PhotoCarousel from "./components/PhotoCarousel.jsx";
import ArticleSection from "./components/ArticleSection.jsx";
import VideoSection from "./components/VideoSection.jsx";
import Credits from "./components/Credits.jsx";
import PrintEdition from "./components/PrintEdition.jsx";
import sections from "./data/index.js";
import videos from "./data/videos.js";
import printEdition from "./data/printEdition.js";
import "./components/ArticleCard.css";

// Page order follows the Figma mockup (homecoming_SE.png):
// NavBar -> LetterFromEditor -> PhotoCarousel -> ArticleSections -> PrintEdition -> Credits
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
            id={section.id}
            sectionTitle={section.title}
            articles={section.articles}
          />
        ))}
        <VideoSection
          id={videos.id}
          sectionTitle={videos.title}
          reels={videos.reels}
        />
      </div>
      <PrintEdition
        id={printEdition.id}
        sectionTitle={printEdition.title}
        pdf={printEdition.pdf}
        pages={printEdition.pages}
      />
      <Credits />
    </>
  );
}

export default App;
