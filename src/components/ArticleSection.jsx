import ArticleCard from "./ArticleCard";

function ArticleSection({sectionTitle, articles}) {
    return (
        <div className="section-container">
            <h2 className="section-title">{sectionTitle}</h2>
            <div className='article-section'>
            {articles.map((article, i) => (
                <ArticleCard
                    key={i}
                    imgPath = {article.image}
                    articleTitle = {article.title}
                    articleAuthor = {article.byline}
                    articleLink = {article.url}
                />
            ))}
            </div>
        </div>
        
    );
}

export default ArticleSection