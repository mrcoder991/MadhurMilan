import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/action-creators/user';
import useDynamicTheme from '../hooks/useDynamicTheme';
import { APP_NAME } from '../constants';

const initialState = {
  userId: '',
  password: '',
};

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState(initialState);
  const theme = useTheme();
  const { isDarkMode } = useDynamicTheme();
  const styles = getStyles(theme);
  const dispatch = useDispatch();

  const handleChangeUserId = userId => {
    setFormData({
      ...formData,
      userId,
    });
  };

  const handleChangePassword = password => {
    setFormData({
      ...formData,
      password,
    });
  };

  const handleSubmit = () => {
    dispatch(
      userLogin(
        {
          memberRegistrationId: formData.userId,
          password: formData.password,
        },
        navigation,
      ),
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ImageBackground
        source={
          isDarkMode
            ? require('../assets/images/loginBgDark.png')
            : require('../assets/images/loginBgLight.png')
        }
        imageStyle={styles.opacity}
        style={styles.image}>
        <Card style={styles.card} mode="contained">
          <Image
            source={
              isDarkMode
                ? require('../assets/images/logoDark.png')
                : require('../assets/images/logoLight.png')
            }
            style={styles.avatar}
          />
          <Text variant="titleLarge" style={styles.text}>
            {APP_NAME}
          </Text>
          <Text variant="titleMedium" style={styles.text}>
            Sign In
          </Text>
          <TextInput
            style={styles.input}
            label="Member Registration ID"
            mode="outlined"
            value={formData.userId}
            placeholder="Enter your Member Registration ID"
            onChangeText={handleChangeUserId}
            autoCapitalize="none"
            autoCompleteType="userId"
            textContentType="username"
            keyboardType="default"
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            textContentType="password"
            label="Password"
            mode="outlined"
            value={formData.password}
            placeholder="Enter Password"
            onChangeText={handleChangePassword}
            secureTextEntry
            returnKeyType="done"
          />
          <Button style={styles.button} mode="contained" onPress={handleSubmit}>
            Login
          </Button>
        </Card>
        {/* </View> */}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const getStyles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  opacity: {
    opacity: 0.1,
  },
  image: {
    backgroundColor: theme.colors.surface,
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
    marginHorizontal: theme.padding,
  },
  avatar: {
    width: 110,
    height: 110,
    alignSelf: 'center',
  },
  input: {
    marginTop: 8,
    width: 350,
  },
  text: {
    alignSelf: 'center',
    padding: 10,
  },
  button: {
    marginTop: 16,
  },
}));
export default Login;
