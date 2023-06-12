import { Article } from './Article';

export interface ArticleResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
