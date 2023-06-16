import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Input, Button } from 'react-native-elements';

import { SortButtons } from './SortButton';

type Props = {
  onInputChange: (value: string) => void;
  onButtonClick: () => void;
  articlesLength: boolean;
  onSortButtonClick: (value: string) => void;
};

export const SearchForm: React.FC<Props> = (
  {
    onInputChange,
    onButtonClick,
    articlesLength,
    onSortButtonClick,
  }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Enter the subject of the articles</Text>
      
      <View style={styles.formsContainer}>
        <Input
          placeholder='e.g. NASA'
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={onInputChange}
          onSubmitEditing={onButtonClick}
        />
        
        <Button
          title='Search'
          buttonStyle={styles.searchButton}
          onPress={onButtonClick}
        />
      </View>
      
      {articlesLength && (
        <View style={styles.sortContainer}>
          <Text>Sort By: </Text>
          
          <SortButtons onSortButtonClick={onSortButtonClick} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 35,
    paddingRight: 45,
  },
  formsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  input: {
    fontSize: 14,
  },
  searchButton: {
    height: 40,
    backgroundColor: '#6fbbd3',
  },
  sortContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
});
