import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { DEFAULT_PROFILE_IMAGE, SCREENS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, List, Text } from 'react-native-paper';
import { userLogout } from '../redux/action-creators/user';

const Account = ({ navigation }) => {
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{
            uri: userData.profileImg || DEFAULT_PROFILE_IMAGE,
          }}
          style={styles.avatar}
        />
        <Text variant="titleMedium">{userData.memberRegistrationId}</Text>
        <Text variant="titleLarge">{userData.name}</Text>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate(SCREENS.USER_PROFILE, { data: userData })
          }>
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
              title="About Madhur Milan"
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
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
  },
  card: {
    width: '95%',
    marginVertical: 20,
    marginHorizontal: 10,
  },
});
