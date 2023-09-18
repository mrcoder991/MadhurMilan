import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';

const Home = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
const getStyles = StyleSheet.create(theme => {});

export default Home;
