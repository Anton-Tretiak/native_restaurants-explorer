import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from './src/components/Header/Header';
import { SearchForm } from './src/components/SearchForm/SearchForm';
import { ArticlesList } from './src/components/ArticlesList/ArticlesList';

export default function App() {
  const [query, setQuery] = useState('');
  const [searchedText, setSearchedText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleInputChange = (value) => {
    setQuery(value);
  };
  
  const handleButtonClick = () => {
    if (query) {
      setSearchedText(query.toLowerCase());
      setCurrentPage(1);
    }
  };
  
  const handleCurrentPageChange = (value) => {
    setCurrentPage(value);
  };
  
  return (
    <>
      <Header />
      
      <View style={styles.container}>
        <SearchForm
          onInputChange={handleInputChange}
          onButtonClick={handleButtonClick}
        />
        {searchedText && (
          <ArticlesList
            searchedText={searchedText}
            currentPage={currentPage}
            onCurrentPageChange={handleCurrentPageChange}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
