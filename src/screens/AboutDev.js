import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import CustomStatusBar from '../components/CustomStatusBar';

const AboutDev = () => {
  return (
    <View>
      <CustomStatusBar />
      <Text>AboutDev</Text>
    </View>
  );
};

export default AboutDev;

const styles = StyleSheet.create({});
