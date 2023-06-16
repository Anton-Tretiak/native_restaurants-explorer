import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';

import { Article } from '../../Types/Article';

type Props = {
  isModalVisible: boolean;
  onCloseModal: () => void;
  selectedArticle: Article | null;
};
export const ArticleModal: React.FC<Props> = ({ isModalVisible, onCloseModal, selectedArticle }) => {
  let formattedDate = '';
  
  if (selectedArticle && selectedArticle.publishedAt) {
    const publishedDate = new Date(selectedArticle.publishedAt);
    const hours = publishedDate.getHours().toString().padStart(2, '0');
    const minutes = publishedDate.getMinutes().toString().padStart(2, '0');
    const day = publishedDate.getDate().toString().padStart(2, '0');
    const month = (publishedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = publishedDate.getFullYear().toString().slice(-2);
    
    formattedDate = `${day}.${month}.${year}, ${hours}:${minutes}`;
  }
  
  const handleLinkPress = () => {
    if (selectedArticle) {
      Linking.openURL(`${selectedArticle.url}`);
    }
  };
  
  return (
    <Modal visible={isModalVisible} onRequestClose={onCloseModal} animationType="slide">
      <View style={styles.modalContainer}>
        {selectedArticle && (
          <View>
            <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
            
            {selectedArticle.urlToImage && (
              <Image style={styles.modalImage} source={{ uri: selectedArticle.urlToImage }} />
            )}
            
            <Text style={styles.modalDescription}>{selectedArticle.description}</Text>
            
            <TouchableOpacity style={styles.detailsContainer} onPress={handleLinkPress}>
              <Text style={styles.modalDetails}>Open in browser</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalAuthor}>Author: {selectedArticle.author}</Text>
            <Text style={styles.modalSource}>Source: {selectedArticle.source.name}</Text>
            
            <Text style={styles.modalDate}>{formattedDate}</Text>
            
            <TouchableOpacity style={styles.closeButton} onPress={onCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 10,
    color: 'white',
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    aspectRatio: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  modalDescription: {
    marginTop: 10,
    color: 'white',
  },
  detailsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDetails: {
    padding: 10,
    paddingRight: 7,
    marginTop: 5,
    color: 'white',
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#6fbbd3',
    borderRadius: 10,
  },
  modalAuthor: {
    color: 'white',
    marginTop: 10,
  },
  modalSource: {
    color: 'white',
  },
  modalDate: {
    fontSize: 16,
    marginTop: 10,
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
