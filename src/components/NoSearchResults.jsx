import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, useTheme } from 'react-native-paper';

const NoSearchResults = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <>
      <Image
        style={styles.image}
        source={require('../assets/images/notFound.webp')}
      />
      <Text style={styles.infoText} variant="titleMedium">
        No Search Results found for your search
      </Text>
    </>
  );
};

export default NoSearchResults;

const getStyles = StyleSheet.create(theme => ({
  image: {
    marginTop: 100,
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  infoText: {
    textAlign: 'center',
    marginHorizontal: theme.padding * 4.5,
    alignSelf: 'center',
  },
}));
