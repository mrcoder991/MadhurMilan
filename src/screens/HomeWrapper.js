import {StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import About from './About';
import Feed from './Feed';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

const HomeWrapper = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Feed} />
      <BottomTab.Screen name="About" component={About} />
    </BottomTab.Navigator>
  );
};
const getStyles = StyleSheet.create(theme => {});

export default HomeWrapper;
