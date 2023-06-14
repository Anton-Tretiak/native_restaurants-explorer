import { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { Header } from './src/components/Header/Header';
import { SearchForm } from './src/components/SearchForm/SearchForm';
import { ArticlesList } from './src/components/ArticlesList/ArticlesList';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [searchedText, setSearchedText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleInputChange = (value) => {
    setInputText(value);
  };
  
  const handleButtonClick = () => {
    if (inputText) {
      setSearchedText(inputText.toLowerCase());
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
