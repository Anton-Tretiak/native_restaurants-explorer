import { StyleSheet, ScrollView, View } from 'react-native';

import { ArticlesList } from "./src/components/ArticlesList/ArticlesList";

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ArticlesList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
