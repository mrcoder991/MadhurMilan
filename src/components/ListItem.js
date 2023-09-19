import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { List, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ListItem = ({ data }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <List.Item
      title={data.name}
      description="Item description"
      left={() => (
        <Image
          source={{ uri: 'https://reactjs.org/logo-og.png' }}
          style={styles.image}
        />
      )}
      onPress={() => navigation.navigate('Details')}
    />
  );
};

export default ListItem;

const getStyles = StyleSheet.create(theme => ({
  image: {
    width: 100,
    height: 100,
    marginLeft: 15,
    borderRadius: theme.roundness,
  },
}));
