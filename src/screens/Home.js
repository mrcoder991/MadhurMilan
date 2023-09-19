import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate('Details')}>
        navigate to details
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
