import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

import Login from './screens/Login';
import HomeWrapper from './components/HomeWrapper';
import Details from './screens/Details';
import Header from './components/Header';
import { APP_NAME } from './constants';
import { getTheme } from './utils/Theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  let { theme } = useMaterial3Theme({ fallbackSourceColor: '#e64a19' });
  const dynamicTheme = getTheme(isDarkMode, theme);

  const isLoggedIn = true;

  return (
    <PaperProvider theme={dynamicTheme}>
      <NavigationContainer theme={dynamicTheme}>
        <Stack.Navigator
          screenOptions={{
            navigationBarColor: dynamicTheme.colors.elevation.level2,
            headerShown: false,
            header: props => <Header {...props} />,
          }}
          initialRouteName={isLoggedIn ? 'HomeWrapper' : 'Login'}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="HomeWrapper"
            component={HomeWrapper}
            options={{
              headerShown: true,
              title: APP_NAME,
            }}
          />
          <Stack.Screen
            options={{ headerShown: true }}
            name="Details"
            component={Details}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
