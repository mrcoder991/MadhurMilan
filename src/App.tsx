import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import merge from 'deepmerge';
import Login from './screens/Login';
import HomeWrapper from './components/HomeWrapper';
import Details from './screens/Details';
import Header from './components/Header';
import { APP_NAME } from './constants';

const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const themeMode = isDarkMode ? 'dark' : 'light';
  let { theme } = useMaterial3Theme({ fallbackSourceColor: '#e64a19' });

  const paperTheme = {
    light: { ...MD3LightTheme, colors: theme.light },
    dark: { ...MD3DarkTheme, colors: theme.dark },
  }[themeMode];
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  const CombinedDefaultTheme = merge(LightTheme, paperTheme);
  const CombinedDarkTheme = merge(DarkTheme, paperTheme);

  let combinedTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  combinedTheme.roundness = 7;

  const isLoggedIn = false;

  return (
    <PaperProvider theme={combinedTheme}>
      <NavigationContainer theme={combinedTheme}>
        <Stack.Navigator
          screenOptions={{
            navigationBarColor: combinedTheme.colors.elevation.level2,
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
