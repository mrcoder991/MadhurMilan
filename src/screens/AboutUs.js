import {
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
} from 'react-native';
import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';
import CustomStatusBar from '../components/CustomStatusBar';
import useDynamicTheme from '../hooks/useDynamicTheme';
import { APP_NAME, DEFAULT_PROFILE_IMAGE } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const trustees = [
  {
    name: 'Mr. Ramesh R. Shah',
    designation: 'Founder Member & President',
    phone: '8793004145',
  },
  {
    name: 'Mr. Kiran J. Shah',
    designation: 'Founder Member & Vice President',
    phone: '8149435079',
  },
  {
    name: 'Mr. Udya Lengde',
    designation: 'Trustee',
    phone: '9422089813',
  },
  {
    name: 'Mrs. Pallavi Y. Shah',
    designation: 'Trustee',
    phone: '9881245245',
  },
  {
    name: 'Dr. Shrenik S. Shah',
    designation: 'Trustee',
    phone: '9844676562',
  },
  {
    name: 'Mr. Sushil S. Shah',
    designation: 'Trustee',
    phone: '9822056066',
  },
  {
    name: 'Mrs. Deepali U. Gandhi',
    designation: 'Trustee',
    phone: '9923697003',
  },
  {
    name: 'Dr. Sanjeev R. Shah',
    designation: 'Trustee',
    phone: '9421026003',
  },
  {
    name: 'Mr. Sanjog V. Shah',
    designation: 'Trustee',
    phone: '9236088553',
  },
];

const AboutUs = () => {
  const { isDarkMode } = useDynamicTheme();
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeAreaView}>
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
            <Text variant="titleMedium" style={styles.text}>
              Jai Jinendra,
            </Text>
            <Text variant="titleSmall" style={styles.text}>
              It is a well established fact that the sammelan arranged by
              “Madhur Milan Trust, Pune” is unique in its arrangements,
              discipline, management and reach within Jain Community.
            </Text>
            <Text variant="titleSmall" style={styles.text}>
              Madhur Milan Trust arranges “Yuvak-Yuvati Parichay Sammelan” for
              two days. On first day candidates are introduced and on second day
              candidates and his / her family members are given free time to
              interact with other candidates and their family members. This
              sammelan is opened to all castes, subcastes and panth of all Jain
              Community.
            </Text>
            <Text variant="titleSmall" style={styles.text}>
              We request you all to extract maximum benefits from this sammelan.
              As we are evolving in the digital world and as more and more
              people are comfortable with online world, we have created a
              website, “www.madhurmilantrust.com”. With the help of this website
              the candidates can submit the forms and make registration fees
              online.
            </Text>
            <Text variant="titleSmall" style={styles.text}>
              With the help of this website the candidates can access
              information of other candidates by logging into the system. We at
              “Madhur Milan Trust, Pune” also publish an E-book with all the
              candidates information which can be easily downloaded on your
              devices. We at “Madhur Milan Trust, Pune” wish all the candidates
              A Good Luck !!!
            </Text>
          </Card>
          <Card style={styles.card} mode="contained">
            <Text variant="titleLarge" style={styles.title}>
              Our Trustees
            </Text>
            {trustees.map((data, index) => (
              <View style={styles.profileCard} key={data.name}>
                <Image
                  source={{
                    uri: DEFAULT_PROFILE_IMAGE,
                  }}
                  resizeMode="cover"
                  style={styles.profileImage}
                />
                <View styles={styles.infoContainer}>
                  <Text selectable variant="titleMedium" style={[styles.text]}>
                    {data.name}
                  </Text>

                  <Text selectable variant="labelLarge" style={[styles.text]}>
                    {data.designation}
                  </Text>

                  <Text selectable variant="labelMedium" style={[styles.text]}>
                    {data.phone}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AboutUs;

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
    marginBottom: theme.padding * 2,
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
    width: 0.2 * width,
    aspectRatio: '1/1',
    borderRadius: theme.roundness,
  },
}));
