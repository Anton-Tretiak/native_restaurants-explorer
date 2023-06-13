import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>NewsAPI</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'lightblue',
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
