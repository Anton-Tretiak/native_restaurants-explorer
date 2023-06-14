import React from 'react';
import { Article } from '../../Types/Article';
import { Text, View, StyleSheet } from "react-native";

type Props = {
  article: Article;
  readableDate: string;
};
export const ArticlesItem: React.FC<Props> = ({ article, readableDate  }) => {
  return (
    <View
      key={article.url}
      style={styles.articleContainer}
    >
      <Text style={styles.heading}>
        {article.title}
      </Text>
      
      <View style={styles.footer_container}>
        <Text style={styles.date}>
          {readableDate}
        </Text>
        
        <Text style={styles.source}>
          Source: {article.source.name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footer_container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: "space-between"
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  source: {
    fontSize: 14,
    color: '#888',
  },
});
