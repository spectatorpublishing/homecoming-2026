import ArticleCard from "./ArticleCard";

function ArticleSection({id, sectionTitle, articles}) {
    return (
        <section id={id} className="section-container">
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
        </section>
        
    );
}

export default ArticleSection