import React, { useState } from 'react';
import {
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

const initialState = {
  userId: '',
  password: '',
};

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState(initialState);
  const theme = useTheme();
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
        source={{
          uri: 'https://ik.imagekit.io/nmtrlmn4bwh/MadhurMilan/128174959-indian-lifestyle-sketch-for-your-design-vector-illustration_4zYnpakyR.jpg',
        }}
        resizeMode="cover"
        style={styles.image}>
        <Card style={styles.card} mode="contained">
          <Avatar.Icon size={50} icon="lock-outline" style={styles.lock} />
          <Text variant="titleLarge" style={styles.text}>
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
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 200,
    marginHorizontal: 20,
  },
  input: {
    marginTop: 8,
    width: 350,
  },
  lock: {
    alignSelf: 'center',
    backgroundColor: theme.colors.secondary,
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
