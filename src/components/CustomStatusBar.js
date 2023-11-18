import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';
import useDynamicTheme from '../hooks/useDynamicTheme';

const CustomStatusBar = () => {
  const theme = useTheme();
  const { isDarkMode } = useDynamicTheme();
  return (
    <StatusBar
      backgroundColor={theme.colors.elevation.level2}
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    />
  );
};

export default CustomStatusBar;
