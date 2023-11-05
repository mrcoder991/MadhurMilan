import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import CustomStatusBar from '../components/CustomStatusBar';

const AboutUs = () => {
  return (
    <View>
      <CustomStatusBar />
      <Text>About Us</Text>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({});
