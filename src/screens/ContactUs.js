import {
  StyleSheet,
  Linking,
  ToastAndroid,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import React, { useCallback } from 'react';
import { Text, useTheme, Card } from 'react-native-paper';
import useDynamicTheme from '../hooks/useDynamicTheme';
import { APP_NAME } from '../constants';
import CustomStatusBar from '../components/CustomStatusBar';

const OpenURLText = ({ url, children }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const handlePress = useCallback(async () => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Unable to open this link', ToastAndroid.SHORT);
    }
  }, [url]);

  return (
    <Text style={styles.link} onPress={handlePress}>
      {children}
    </Text>
  );
};

const ContactUs = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { isDarkMode } = useDynamicTheme();

  const handlePress = async url => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Unable to open this link', ToastAndroid.SHORT);
    }
  };
  return (
    <ImageBackground
      source={
        isDarkMode
          ? require('../assets/images/loginBgDark.png')
          : require('../assets/images/loginBgLight.png')
      }
      imageStyle={styles.opacity}
      style={styles.image}>
      <CustomStatusBar />
      <View style={styles.container}>
        <Card style={styles.card} mode="contained">
          <Image
            source={
              isDarkMode
                ? require('../assets/images/logoDark.png')
                : require('../assets/images/logoLight.png')
            }
            style={styles.avatar}
          />
          <Text variant="titleLarge" style={styles.title}>
            {APP_NAME}
          </Text>
          <Text style={styles.infoText} variant="titleMedium">
            Name - Ronak Gandhi
          </Text>
          <Text style={styles.infoText} variant="titleMedium">
            Phone No -{' '}
            <OpenURLText url={'tel:8830958767'}>8830958767</OpenURLText>
          </Text>
          <Text
            handlePress={() => handlePress('mailto:madhurmilan16@gmail.com')}
            style={styles.infoText}
            variant="titleMedium">
            Email Id -{' '}
            <OpenURLText url={'mailto:madhurmilan16@gmail.com'}>
              madhurmilan16@gmail.com
            </OpenURLText>
          </Text>
        </Card>
      </View>
    </ImageBackground>
  );
};

export default ContactUs;

const getStyles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    margin: theme.padding,
    padding: theme.padding,
  },
  infoText: {
    marginHorizontal: theme.padding,
  },
  link: {
    textDecorationLine: 'underline',
    color: '#6973f5',
  },
  avatar: {
    width: 110,
    height: 110,
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'center',
    margin: theme.padding,
  },
  image: {
    backgroundColor: theme.colors.surface,
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  opacity: {
    opacity: 0.1,
  },
}));
