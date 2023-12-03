import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { DEFAULT_PROFILE_IMAGE, SCREENS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Chip, List, Text, useTheme } from 'react-native-paper';
import { userLogout } from '../redux/action-creators/user';
import { getAge } from '../utils';

const Account = ({ navigation }) => {
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileView}>
          <Image
            source={{
              uri: userData.profileImg || DEFAULT_PROFILE_IMAGE,
            }}
            style={styles.avatar}
          />
          <View style={styles.profileDetails}>
            <Text variant="titleMedium">{userData.name}</Text>
            {userData.birthDate && (
              <Text variant="labelLarge" style={[styles.text]}>
                {getAge(userData.birthDate)} Years old
              </Text>
            )}
            <Text variant="bodyMedium">
              {userData.profession && userData.companyName
                ? `${userData.profileFor} · ${userData.maritalStatus}`
                : `${userData.profileFor || userData.maritalStatus}`}
            </Text>
            <Text>
              <Chip variant="bodyLarge">{userData.memberRegistrationId}</Chip>
            </Text>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate(SCREENS.USER_PROFILE, { data: userData })
          }
          style={styles.profileButton}>
          My Profile
        </Button>

        <Card style={styles.card} mode="contained">
          <Card.Content>
            <List.Item
              title="Contact Us"
              left={props => <List.Icon {...props} icon="phone" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate(SCREENS.CONTACT_US)}
            />
            <List.Item
              title="About Madhur Milan Trust"
              left={props => <List.Icon {...props} icon="bank" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate(SCREENS.ABOUT_US)}
            />
            <List.Item
              title="About Developer"
              left={props => <List.Icon {...props} icon="code-tags" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate(SCREENS.ABOUT_DEV)}
            />
            <List.Item
              title="Log Out"
              left={props => <List.Icon {...props} icon="logout" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => dispatch(userLogout(navigation))}
            />
          </Card.Content>
        </Card>
        <Text variant="titleSmall" style={styles.center}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

export default Account;

const { width } = Dimensions.get('window');
const getStyles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  card: {
    width: width - theme.padding * 2,
    margin: theme.padding,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.padding,
    padding: theme.padding,
    width: width - theme.padding * 2,
    marginTop: theme.padding,
  },
  profileDetails: {
    flex: 1,
    gap: theme.padding / 3,
  },
  profileButton: {
    margin: theme.padding,
  },
  center: {
    alignSelf: 'center',
  },
}));
