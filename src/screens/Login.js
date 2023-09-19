import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

const initialState = {
  email: '',
  password: '',
};

const Login = ({navigation}) => {
  const [formData, setFormData] = useState(initialState);
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleChangeEmail = email => {
    setFormData({
      ...formData,
      email,
    });
  };

  const handleChangePassword = password => {
    setFormData({
      ...formData,
      password,
    });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Avatar.Icon size={50} icon="lock-outline" style={styles.lock} />
        <Text variant="titleLarge" style={styles.text}>
          Sign In
        </Text>
        <TextInput
          style={styles.input}
          label="Email"
          mode="outlined"
          value={formData.email}
          placeholder="Enter your Email"
          onChangeText={handleChangeEmail}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
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
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.push('HomeWrapper')}>
          Login
        </Button>
      </Card>
    </View>
  );
};

const getStyles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
