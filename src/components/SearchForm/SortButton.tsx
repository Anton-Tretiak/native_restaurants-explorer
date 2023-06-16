import React from 'react';
import { Button } from 'react-native-elements';

type Props = {
  onSortButtonClick: (value: string) => void;
};

export const SortButtons: React.FC<Props> = ({ onSortButtonClick }) => {
  return (
    <>
      <Button
        title='Popular'
        containerStyle={{
          width: 100,
          height: 40,
        }}
        buttonStyle={{
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#6fbbd3',
        }}
        titleStyle={{
          color: '#6fbbd3',
        }}
        onPress={() => onSortButtonClick('popularity')}
      />
      
      <Button
        title='New'
        containerStyle={{
          width: 100,
          height: 40,
        }}
        buttonStyle={{
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#6fbbd3',
        }}
        titleStyle={{
          color: '#6fbbd3',
        }}
        onPress={() => onSortButtonClick('publishedAt')}
      />
      
      <Button
        title='Relevant'
        containerStyle={{
          width: 100,
          height: 40,
        }}
        buttonStyle={{
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#6fbbd3',
        }}
        titleStyle={{
          color: '#6fbbd3',
        }}
        onPress={() => onSortButtonClick('relevancy')}
      />
    </>
  );
};
