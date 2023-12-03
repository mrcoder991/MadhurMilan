import React from 'react';
import Account from '../screens/Account';
import Home from '../screens/Home';
import Search from '../screens/Search';
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
        name="Search"
        component={Search}
        options={{
          tabBarIcon: 'magnify',
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: 'account',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default HomeWrapper;
