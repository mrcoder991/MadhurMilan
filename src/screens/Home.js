import { FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import ListItem from '../components/ListItem';
import { Button, Divider } from 'react-native-paper';
import { getLocalStorage } from '../utils';
import { fetchMorePosts, fetchPosts } from '../utils/api';

const Home = ({ navigation }) => {
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  getLocalStorage('profiles').then(profiles => setData(profiles.data));

  const handleRefresh = () => {
    fetchPosts(true);
    getLocalStorage('profiles').then(profiles => setData(profiles.data));
  };

  const handlefetchMorePosts = async () => {
    setIsFetching(true);
    await fetchMorePosts();
    getLocalStorage('profiles').then(profiles => setData(profiles.data));
    setIsFetching(false);
  };
  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => <ListItem data={item} />}
        ItemSeparatorComponent={Divider}
        keyExtractor={item => item._id}
        refreshing={!data}
        onRefresh={handleRefresh}
        ListFooterComponent={
          <Button
            style={styles.button}
            mode="outlined"
            onPress={handlefetchMorePosts}
            loading={isFetching}>
            {isFetching ? 'Loading' : 'Load More'}
          </Button>
        }
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    margin: 10,
    marginBottom: 30,
    width: '50%',
  },
});
