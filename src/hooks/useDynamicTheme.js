import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useColorScheme } from 'react-native';
import { getTheme } from '../utils/Theme';

const useDynamicTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';
  let { theme } = useMaterial3Theme({ fallbackSourceColor: '#3071f2' });
  const dynamicTheme = getTheme(isDarkMode, theme);
  return { dynamicTheme, isDarkMode };
};

export default useDynamicTheme;
