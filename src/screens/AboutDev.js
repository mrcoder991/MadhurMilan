import {
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Linking,
  ToastAndroid,
} from 'react-native';
import React, { useCallback } from 'react';
import { Card, Text, TouchableRipple, useTheme } from 'react-native-paper';
import CustomStatusBar from '../components/CustomStatusBar';
import useDynamicTheme from '../hooks/useDynamicTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const AboutDev = () => {
  const { isDarkMode } = useDynamicTheme();
  const theme = useTheme();
  const styles = getStyles(theme);
  const handlePress = async url => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Unable to open this link', ToastAndroid.SHORT);
    }
  };
  return (
    <SafeAreaView edges={[]} style={styles.safeAreaView}>
      <ImageBackground
        source={
          isDarkMode
            ? require('../assets/images/loginBgDark.png')
            : require('../assets/images/loginBgLight.png')
        }
        imageStyle={styles.opacity}
        style={styles.image}>
        <CustomStatusBar />
        <ScrollView style={styles.container}>
          <Card style={styles.card} mode="contained">
            <View style={styles.profileCard}>
              <Image
                source={{
                  uri: 'https://ik.imagekit.io/nmtrlmn4bwh/MadhurMilan/uday2?w=500',
                }}
                resizeMode="cover"
                style={styles.profileImage}
              />
              <View styles={styles.infoContainer}>
                <Text selectable variant="titleMedium" style={[styles.text]}>
                  Uday Girhepunje
                </Text>

                <Text variant="labelLarge" style={[styles.text]}>
                  Software Developer
                </Text>

                <Text selectable variant="labelMedium" style={[styles.text]}>
                  <OpenURLText url={'mailto:udaygirhepunje41@gmail.com'}>
                    udaygirhepunje41@gmail.com
                  </OpenURLText>
                </Text>
              </View>
            </View>
          </Card>
          <Card mode="contained" style={styles.card}>
            <Text variant="titleMedium" style={[styles.text]}>
              Develpers' Note ❤️
            </Text>
            <Text variant="labelLarge" style={[styles.text]}>
              Developed connections, eternal affections. Cheers to the couples
              who found and will find their soulmates via this app. Wishing you
              everlasting happiness and endless love! 💍✨
            </Text>
          </Card>
          <View style={styles.socials}>
            <TouchableRipple
              style={styles.socialCardWrapper}
              onPress={() => handlePress('https://github.com/mrcoder991')}>
              <Card mode="contained" style={styles.socialCard}>
                <Image
                  source={
                    isDarkMode
                      ? require('../assets/images/GithubDark.png')
                      : require('../assets/images/GithubLight.png')
                  }
                  style={styles.socialIcon}
                />
                <Text variant="titleSmall" style={[styles.socialText]}>
                  GitHub
                </Text>
              </Card>
            </TouchableRipple>
            <TouchableRipple
              style={styles.socialCardWrapper}
              onPress={() =>
                handlePress('https://www.linkedin.com/in/uday-girhepunje/')
              }>
              <Card mode="contained" style={styles.socialCard}>
                <Image
                  source={require('../assets/images/LinkedIn.png')}
                  style={styles.socialIcon}
                />
                <Text variant="titleSmall" style={[styles.socialText]}>
                  LinkedIn
                </Text>
              </Card>
            </TouchableRipple>
            <TouchableRipple
              style={styles.socialCardWrapper}
              onPress={() => handlePress('https://www.instagram.com/uday_699')}>
              <Card mode="contained" style={styles.socialCard}>
                <Image
                  source={require('../assets/images/Instagram.webp')}
                  style={styles.socialIcon}
                />
                <Text variant="titleSmall" style={[styles.socialText]}>
                  Instagram
                </Text>
              </Card>
            </TouchableRipple>
          </View>
          <View style={styles.socials}>
            <TouchableRipple
              style={styles.socialCardWrapper}
              onPress={() => handlePress('https://twitter.com/UdayGirhepunje')}>
              <Card mode="contained" style={styles.socialCard}>
                <Image
                  source={
                    isDarkMode
                      ? require('../assets/images/XDark.png')
                      : require('../assets/images/XLight.png')
                  }
                  style={styles.socialIcon}
                />
                <Text variant="titleSmall" style={[styles.socialText]}>
                  Twitter
                </Text>
              </Card>
            </TouchableRipple>
            <TouchableRipple
              style={styles.socialCardWrapper}
              onPress={() => handlePress('https://mrcoder991.github.io/')}>
              <Card mode="contained" style={styles.socialCard}>
                <Image
                  source={require('../assets/images/uday.png')}
                  style={styles.socialIcon}
                />
                <Text variant="titleSmall" style={[styles.socialText]}>
                  Portfolio Website
                </Text>
              </Card>
            </TouchableRipple>
          </View>
          <Text variant="titleSmall" style={styles.title}>
            Created with ❤️
          </Text>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AboutDev;

const { width } = Dimensions.get('window');
const getStyles = StyleSheet.create(theme => ({
  safeAreaView: {
    flex: 1,
    marginBottom: theme.padding,
  },
  container: {
    padding: theme.padding,
    flex: 1,
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
  card: {
    paddingVertical: theme.padding,
    marginBottom: theme.padding,
  },
  title: {
    alignSelf: 'center',
    margin: theme.padding,
  },
  text: {
    marginHorizontal: theme.padding,
    marginBottom: theme.padding / 2,
  },
  profileCard: {
    padding: theme.padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 0.27 * width,
    aspectRatio: '1/1',
    borderRadius: theme.roundness,
  },
  link: {
    textDecorationLine: 'underline',
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.padding,
    flexWrap: 'wrap',
  },
  socialCardWrapper: {
    flex: 1,
    marginBottom: theme.padding,
  },
  socialCard: {
    padding: theme.padding,
  },
  socialIcon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  socialText: {
    alignSelf: 'center',
    marginTop: theme.padding,
  },
}));
