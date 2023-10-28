import { FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import { Button, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMoreProfiles,
  getProfiles,
} from '../redux/action-creators/profiles';

const Home = ({ navigation }) => {
  const [isFetching, setIsFetching] = useState(false);
  const data = useSelector(state => state.profilesData.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getProfiles(true));
  };

  const handlefetchMorePosts = () => {
    setIsFetching(true);
    dispatch(getMoreProfiles());
    setIsFetching(false);
  };
  return (
    <>
      <FlatList
        removeClippedSubviews
        data={data}
        renderItem={_renderitem}
        initialNumToRender={5}
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

const _renderitem = ({ item }) => <ListItem data={item} />;

export default Home;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    margin: 10,
    marginBottom: 30,
    width: '50%',
  },
});
