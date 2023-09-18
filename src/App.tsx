import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import {useMaterial3Theme} from '@pchmn/expo-material3-theme';

import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, useColorScheme} from 'react-native';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const themeMode = isDarkMode ? 'dark' : 'light';
  const {theme} = useMaterial3Theme({fallbackSourceColor: '#e64a19'});

  const paperTheme = {
    light: {...MD3LightTheme, colors: theme.light},
    dark: {...MD3DarkTheme, colors: theme.dark},
  }[themeMode];

  const combinedTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={combinedTheme}>
        <SafeAreaView style={styles.safeArea}>
          <Login />
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
