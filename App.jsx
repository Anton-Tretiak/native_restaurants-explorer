import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Header } from './src/components/Header/Header';
import { SearchForm } from './src/components/SearchForm/SearchForm';
import { ArticlesList } from './src/components/ArticlesList/ArticlesList';

export default function App() {
  const [query, setQuery] = useState('');
  const [searchedText, setSearchedText] = useState('');
  const [sortValue, setSortValue] = useState('relevancy');
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesLength, setArticlesLength] = useState(false);
  
  const handleInputChange = (value) => {
    setQuery(value);
  };
  
  const handleButtonClick = () => {
    if (query) {
      setSearchedText(query.toLowerCase());
      setCurrentPage(1);
      setArticlesLength(true);
    }
  };
  
  const handleCurrentPageChange = (value) => {
    setCurrentPage(value);
  };
  
  const handleArticlesLength = () => {
    setArticlesLength(true);
  };
  
  const handleSortButtonClick = (value) => {
    setSortValue(value);
    setCurrentPage(1);
  };
  
  const handleGoBack = () => {
    setArticlesLength(false);
  };
  
  return (
    <>
      <Header />
      
      {articlesLength && (
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={styles.goBackButton}>🔙 Go back</Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.container}>
        <SearchForm
          onInputChange={handleInputChange}
          onButtonClick={handleButtonClick}
          articlesLength={articlesLength}
          onSortButtonClick={handleSortButtonClick}
        />
        {searchedText && articlesLength && (
          <ArticlesList
            searchedText={searchedText}
            currentPage={currentPage}
            sortValue={sortValue}
            onCurrentPageChange={handleCurrentPageChange}
            onArticlesLength={handleArticlesLength}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBackButton: {
    marginTop: 20,
    marginLeft: 10,
    padding: 10,
  },
});
