import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Article } from '../../Types/Article';
import NewsAPI from '../../API/NewsAPI';

import { ArticlesItem } from '../ArticlesItem/ArticlesItem';

export const ArticlesList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  
  useEffect(() => {
    getArticles();
  }, []);
  
  const getArticles = async () => {
    const fetchedArticles = await NewsAPI.fetchArticles();
    
    setArticles(fetchedArticles);
  };
  
  return (
    <View style={styles.container}>
      {articles.map(article => {
        return (
          <ArticlesItem article={article} key={article.url} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});
