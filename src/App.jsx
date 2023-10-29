import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

import Login from './screens/Login';
import HomeWrapper from './components/HomeWrapper';
import Details from './screens/Details';
import Header from './components/Header';
import { APP_NAME, REDUX_STATE_STATUS } from './constants';
import { getTheme } from './utils/Theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
// import { dummyTheme } from './data';

const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  let { theme } = useMaterial3Theme({ fallbackSourceColor: '#3071f2' });
  const dynamicTheme = getTheme(isDarkMode, theme);

  const userData = useSelector(state => state.userData);
  const userLoginStatus = useSelector(state => state.userLoginStatus);

  const isLoggedIn = userData && userLoginStatus === REDUX_STATE_STATUS.SUCCESS;
  return (
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
  );
}
