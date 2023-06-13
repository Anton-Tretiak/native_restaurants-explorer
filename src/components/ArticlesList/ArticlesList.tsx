import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';

import { Article } from '../../Types/Article';
import NewsAPI from '../../API/NewsAPI';

import { ArticlesItem } from '../ArticlesItem/ArticlesItem';

type Props = {
  searchedText: string;
};

export const ArticlesList: React.FC<Props> = ({ searchedText }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
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
  }, [searchedText]);
  
  const getArticles = async () => {
    setIsLoading(true);
    try {
      const fetchedArticles = await NewsAPI.fetchArticles(searchedText);
      
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6fbbd3  " />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {articles.length > 0
        ? (articles.map(article => {
          return (
            <TouchableOpacity
              key={article.url}
              onPress={() => handleArticlePress(article)}
            >
              <ArticlesItem article={article} />
            </TouchableOpacity>
          );
        }))
        : (
          <Text style={styles.text}>Nothing found! Check your input.</Text>
        )
      }
      <Modal
        visible={isModalVisible}
        onRequestClose={closeModal}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          {selectedArticle && (
            <View>
              <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
              <Text style={styles.modalDescription}>{selectedArticle.description}</Text>
              <Text style={styles.modalDate}>{selectedArticle.publishedAt}</Text>
              
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'white',
  },
  modalDescription: {
    color: 'white',
  },
  modalDate: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6fbbd3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
