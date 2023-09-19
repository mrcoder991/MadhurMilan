import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { APP_NAME } from '../constants';

const Header = ({ navigation, route, options, back }) => {
  const theme = useTheme();
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : route.name;

  return (
    <Appbar.Header
      mode={title === APP_NAME ? 'center-aligned' : 'large'}
      elevated={title === APP_NAME ? false : true}
      theme={{ backgroundColor: theme.colors.elevation }}>
      {back ? <Appbar.BackAction onPress={() => navigation.pop()} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;
