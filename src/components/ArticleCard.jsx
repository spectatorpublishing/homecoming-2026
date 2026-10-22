function ArticleCard({imgPath, articleTitle, articleAuthor, articleLink}) {
    return (
        <a href={articleLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='article-card'>
                <img src={imgPath} style={{
                    width: '325.34px',
                    height: '215.34px',
                    }}/>
                

                <div className='ac-desc'>
                    <h3 className="article-title">
                        {articleTitle}
                    </h3>

                    <h4 className="article-author">
                        By {articleAuthor}
                    </h4>
                </div>
            </div>
        </a>
    );
}

export default ArticleCard