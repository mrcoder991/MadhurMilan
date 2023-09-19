import React from 'react';
import About from '../screens/About';
import Home from '../screens/Home';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const BottomTab = createMaterialBottomTabNavigator();

const HomeWrapper = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: 'home',
        }}
      />
      <BottomTab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: 'account',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default HomeWrapper;
