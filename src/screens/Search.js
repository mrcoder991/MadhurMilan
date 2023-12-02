import { Dimensions, FlatList, StyleSheet, Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import {
  Button,
  Chip,
  Divider,
  Searchbar,
  Text,
  useTheme,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilesBySearch } from '../redux/action-creators/profiles';
import useDynamicTheme from '../hooks/useDynamicTheme';
import { CLEAR_SEARCH } from '../redux/actions';
import NoSearchResults from '../components/NoSearchResults';

const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const data = useSelector(state => state.profilesSearchData?.data);
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { isDarkMode } = useDynamicTheme();

  useEffect(() => {
    // dispatch(getProfilesBySearch("gandhi"));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(getProfilesBySearch(searchQuery));
  };

  const handleClear = () => {
    dispatch({ type: CLEAR_SEARCH });
  };

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <>
      {!data && (
        <Image
          source={
            isDarkMode
              ? require('../assets/images/logoDark.png')
              : require('../assets/images/logoLight.png')
          }
          style={styles.logoImg}
        />
      )}
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBox}
        onClearIconPress={handleClear}
        onSubmitEditing={handleSearch}
      />
      {!data && (
        <>
          <Text style={styles.infoText} variant="titleMedium">
            Search For
          </Text>
          <View style={styles.chips}>
            {[
              { ID: 'identifier' },
              { Name: 'account' },
              { City: 'map-marker' },
              { 'Mother Toungue': 'abugida-devanagari' },
              { Cast: 'flag' },
              { Gotra: 'star-david' },
              { Education: 'book-open-page-variant' },
              { Profession: 'briefcase' },
              { 'Family info, etc...': 'human-male-child' },
            ].map((item, index) => (
              <Chip mode="outlined" key={index} icon={Object.values(item)[0]}>
                {Object.keys(item)[0]}
              </Chip>
            ))}
          </View>
        </>
      )}
      {data &&
        (data?.length > 0 ? (
          <FlatList
            removeClippedSubviews
            data={data}
            renderItem={_renderitem}
            initialNumToRender={5}
            ItemSeparatorComponent={Divider}
            keyExtractor={item => item._id}
          />
        ) : (
          <NoSearchResults />
        ))}
    </>
  );
};

const _renderitem = ({ item }) => <ListItem data={item} />;

export default Search;

const { width } = Dimensions.get('window');

const getStyles = StyleSheet.create(theme => ({
  searchBox: {
    alignSelf: 'center',
    width: width - theme.padding * 2,
    margin: theme.padding,
  },
  logoImg: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: theme.padding,
  },
  chips: {
    flexDirection: 'row',
    margin: theme.padding,
    gap: theme.padding / 2,
    flexWrap: 'wrap',
  },
  infoText: {
    marginHorizontal: theme.padding,
  },
}));
