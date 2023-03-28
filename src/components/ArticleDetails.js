import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleDetails = () => {
    const [article, setArticle] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await axios.get(`https://techcrunch.com/wp-json/wp/v2/posts?slug=${slug}&context=embed`);
                if (res.data.length) {
                    setArticle(res.data[0]);
                    console.log(res.data[0]);
                    setLoading(false);
                } else {
                    throw new Error('Article not found');
                }
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchArticle();
    }, [slug]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong: {error.message}</div>;
    
    return (
        <div className="article-details">
            <img src={article.jetpack_featured_media_url} alt={article.title?.rendered} />
            <h1>{article.title?.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: article.content?.rendered }}></div>
        </div>
    );
};

export default ArticleDetails;