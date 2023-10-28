import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DEFAULT_PROFILE_IMAGE } from '../constants';

const About = () => {
  return (
    <View>
      <Text>tanmay</Text>
      <Image
        source={{
          uri: DEFAULT_PROFILE_IMAGE,
        }}
        style={styles.image}
      />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    // borderRadius: 50,
  },
});
