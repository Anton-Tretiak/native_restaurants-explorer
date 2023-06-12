import { Article } from '../Types/Article';
import { ArticleResponse } from '../Types/ArticleResponse';

const API_KEY = '801db8fcadbf41f2a2c1dae35c6f0e6b';

// GET
const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=nasa&searchIn=title&apiKey=${API_KEY}`
    );
    const data: ArticleResponse = await response.json();
    
    return data.articles;
  } catch (error) {
    console.error(error);
    
    return [];
  }
};

export default { fetchArticles };
