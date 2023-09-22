import merge from 'deepmerge';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

export const getTheme = (isDarkMode, theme) => {
  const themeMode = isDarkMode ? 'dark' : 'light';

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

  // Custom overrides
  const customTheme = {
    ...combinedTheme,
    roundness: 7,
    padding: 15,
    fonts: {
      ...combinedTheme.fonts,
      titleMedium: {
        fontSize: 18,
      },
    },
  };

  return customTheme;
};
