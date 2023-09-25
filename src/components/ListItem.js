import { Dimensions, Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Chip, Text, TouchableRipple, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DEFAULT_PROFILE_IMAGE } from '../constants';

const ListItem = ({ data }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <TouchableRipple onPress={() => navigation.navigate('Details', { data })}>
      <View style={styles.container}>
        <Image
          source={{
            uri: data.profileImg || DEFAULT_PROFILE_IMAGE,
          }}
          style={styles.image}
        />
        <View styles={styles.infoContainer}>
          <Text selectable variant="titleMedium" style={[styles.text]}>
            {data.name}
          </Text>
          <Text variant="labelMedium" style={[styles.text]}>
            {data.profession}
          </Text>
          <Text variant="bodySmall" style={[styles.text]}>
            {data.candidateCity} - {data.height}" - {data.weight} Kg
          </Text>
          <Text style={styles.chip}>
            <Chip style={styles.chip}>{data.memberRegistrationId}</Chip>
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default ListItem;

const { width } = Dimensions.get('window');
const getStyles = StyleSheet.create(theme => ({
  container: {
    padding: theme.padding,
    flexDirection: 'row',
  },
  image: {
    width: 0.3 * width,
    aspectRatio: '1/1',
    borderRadius: theme.roundness,
  },
  infoContainer: {
    flex: 1,
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: theme.padding,
    width: width * 0.6,
  },
  chip: {
    margin: 12,
  },
}));
