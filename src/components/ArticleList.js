import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get('https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed');
                setArticles(res.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong: {error.message}</div>;

    return (
        <div className="article-list">
            {articles.map((article) => (
                <div key={article.id} className="article-card">
                    <Link to={`/articles/${article.slug}`}>
                        <img src={article.jetpack_featured_media_url} alt={article.title.rendered} />
                        <h2>{article.title.rendered}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ArticleList;