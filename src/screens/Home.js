import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { dummyData } from '../data';
import ListItem from '../components/ListItem';
import { Divider } from 'react-native-paper';

const Home = ({ navigation }) => {
  return (
    <FlatList
      data={dummyData}
      renderItem={({ item }) => <ListItem data={item} />}
      ItemSeparatorComponent={Divider}
      keyExtractor={item => item.memberRegistrationId}
    />
  );
};

export default Home;

const styles = StyleSheet.create({});
