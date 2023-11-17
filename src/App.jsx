import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

import Login from './screens/Login';
import HomeWrapper from './components/HomeWrapper';
import Details from './screens/Details';
import Header from './components/Header';
import { APP_NAME, REDUX_STATE_STATUS, SCREENS } from './constants';
import { getTheme } from './utils/Theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import AboutUs from './screens/AboutUs';
import AboutDev from './screens/AboutDev';
import { userLogout } from './redux/action-creators/user';
// import { dummyTheme } from './data';

const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  let { theme } = useMaterial3Theme({ fallbackSourceColor: '#3071f2' });
  const dynamicTheme = getTheme(isDarkMode, theme);
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  const userData = useSelector(state => state.userData);
  const userLoginStatus = useSelector(state => state.userLoginStatus);

  useEffect(() => {
    if (Date.now() >= userData.exp * 1000) {
      dispatch(userLogout());
    }
  }, [dispatch, userData.exp]);

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
            initialRouteName={
              isLoggedIn ? SCREENS.HOME_WRAPPER : SCREENS.LOGIN
            }>
            <Stack.Screen name={SCREENS.LOGIN} component={Login} />
            <Stack.Screen
              name={SCREENS.HOME_WRAPPER}
              component={HomeWrapper}
              options={{ headerShown: true, title: APP_NAME }}
            />
            <Stack.Screen
              options={{ title: 'Candidate Details', headerShown: true }}
              name={SCREENS.DETAILS}
              component={Details}
            />
            <Stack.Screen
              options={{ title: 'My Profile', headerShown: true }}
              name={SCREENS.USER_PROFILE}
              component={Details}
            />
            <Stack.Screen
              options={{ title: 'Contact Us', headerShown: true }}
              name={SCREENS.CONTACT_US}
              component={AboutUs}
            />
            <Stack.Screen
              options={{ title: 'About Madhur Milan', headerShown: true }}
              name={SCREENS.ABOUT_US}
              component={AboutUs}
            />
            <Stack.Screen
              options={{ title: 'About Developer', headerShown: true }}
              name={SCREENS.ABOUT_DEV}
              component={AboutDev}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
