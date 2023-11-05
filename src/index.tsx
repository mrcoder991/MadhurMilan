import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store/configureStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import useDynamicTheme from './hooks/useDynamicTheme';

const Index = () => {
  const { dynamicTheme, isDarkMode } = useDynamicTheme();
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
              <App dynamicTheme={dynamicTheme} />
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default Index;
