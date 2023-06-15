import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Button } from 'react-native-elements';

import { Article } from '../../Types/Article';
import NewsAPI from '../../API/NewsAPI';

import { ArticlesItem } from '../ArticlesItem/ArticlesItem';
import { ArticleModal } from '../ArticleModal/ArticleModal';

type Props = {
  searchedText: string;
  currentPage: number;
  onCurrentPageChange: (value: number) => void;
};

export const ArticlesList: React.FC<Props> = React.memo((
  {
    searchedText,
    currentPage,
    onCurrentPageChange
  }
) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  //pagination
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  
  const handleArticlePress = (article: Article) => {
    setSelectedArticle(article);
    setIsModalVisible(true);
  };
  
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedArticle(null);
  };
  
  useEffect(() => {
    getArticles();
  }, [searchedText, currentPage]);
  
  const getArticles = async () => {
    setIsLoading(true);
    
    try {
      const fetchedArticles = await NewsAPI.fetchArticles(searchedText);
      
      const totalPages = Math.ceil(fetchedArticles.length / itemsPerPage);
      setTotalPages(totalPages);
      
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = currentPage * itemsPerPage;
      const articlesForCurrentPage = fetchedArticles.slice(startIndex, endIndex);
      
      setArticles(articlesForCurrentPage);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderArticleItem = ({ item }: { item: Article }) => {
    const readableDate = item.publishedAt.split('T')[0];
    
    return (
      <TouchableOpacity onPress={() => handleArticlePress(item)}>
        <ArticlesItem article={item} readableDate={readableDate} />
      </TouchableOpacity>
    );
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6fbbd3" />
      </View>
    );
  }
  console.log(currentPage);
  console.log(totalPages);
  console.log('----------------');
  
  return (
    <View style={styles.container}>
      {articles.length > 0 ? (
        <>
          <FlatList
            data={articles}
            renderItem={renderArticleItem}
            keyExtractor={(item) => item.url}
          />
          {currentPage < totalPages && currentPage !== 10 && (
            <Button
              title="Next"
              onPress={() => onCurrentPageChange(currentPage + 1)}
              buttonStyle={styles.button}
            />
          )}
        </>
      ) : (
        <Text style={styles.text}>Nothing found! Check your input.</Text>
      )}
      
      <ArticleModal
        isModalVisible={isModalVisible}
        onCloseModal={closeModal}
        selectedArticle={selectedArticle}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6fbbd3',
    padding: 10,
    borderRadius: 5,
  },
});
