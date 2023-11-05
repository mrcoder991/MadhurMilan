import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import CustomStatusBar from '../components/CustomStatusBar';

const ContactUs = () => {
  return (
    <View>
      <CustomStatusBar />
      <Text>Contact Us</Text>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({});
