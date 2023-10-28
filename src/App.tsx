import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fetchPosts } from './utils/api';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store/configureStore';
import { dummyTheme } from './data';

const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  // let { theme } = useMaterial3Theme({ fallbackSourceColor: '#3071f2' });
  const dynamicTheme = getTheme(isDarkMode, dummyTheme);

  const isLoggedIn = true;

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <PaperProvider theme={dynamicTheme}>
            <StatusBar
              backgroundColor={dynamicTheme.colors.surface}
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <NavigationContainer theme={dynamicTheme}>
              <Stack.Navigator
                screenOptions={{
                  animation: 'fade',
                  animationDuration: 0,
                  navigationBarColor: dynamicTheme.colors.elevation.level2,
                  headerShown: false,
                  header: props => <Header {...props} />,
                }}
                initialRouteName={isLoggedIn ? 'HomeWrapper' : 'Login'}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen
                  name="HomeWrapper"
                  component={HomeWrapper}
                  options={{ headerShown: true, title: APP_NAME }}
                />
                <Stack.Screen
                  options={{ title: 'Candidate Details', headerShown: true }}
                  name="Details"
                  component={Details}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
