import { Dimensions, Image, StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import { Chip, Text, TouchableRipple, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DEFAULT_PROFILE_IMAGE, SCREENS } from '../constants';
import { getAge } from '../utils';

const ListItem = ({ data }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <TouchableRipple
      onPress={() => navigation.navigate(SCREENS.DETAILS, { data })}>
      <View style={styles.container}>
        <Image
          source={{
            uri: data.profileImg || DEFAULT_PROFILE_IMAGE,
          }}
          resizeMode="cover"
          style={styles.image}
        />
        <View styles={styles.infoContainer}>
          {data.name && (
            <Text selectable variant="titleMedium" style={[styles.text]}>
              {data.name}
            </Text>
          )}

          {data.birthDate && (
            <Text variant="labelLarge" style={[styles.text]}>
              {getAge(data.birthDate)} Years old
            </Text>
          )}

          {data.profession && (
            <Text variant="labelMedium" style={[styles.text]}>
              {data.profession}
            </Text>
          )}

          {data.candidateCity && (
            <Text variant="bodySmall" style={[styles.text]}>
              {data.candidateCity}
            </Text>
          )}

          {data.memberRegistrationId && (
            <Text style={styles.chip}>
              <Chip style={styles.chip}>{data.memberRegistrationId}</Chip>
            </Text>
          )}
        </View>
      </View>
    </TouchableRipple>
  );
};

export default memo(ListItem);

const { width } = Dimensions.get('window');
const getStyles = StyleSheet.create(theme => ({
  container: {
    padding: theme.padding,
    flexDirection: 'row',
  },
  image: {
    width: 0.3 * width,
    aspectRatio: '3.4/4',
    borderRadius: theme.roundness,
    overflow: 'hidden',
  },
  infoContainer: {
    flex: 1,
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: theme.padding,
    width: width * 0.6,
    paddingTop: 3,
  },
  weightText: {
    color: theme.colors.outline,
  },
  chip: {
    margin: 12,
  },
  idContainer: {
    flex: 1,
    flexDirection: 'row',
  },
}));
