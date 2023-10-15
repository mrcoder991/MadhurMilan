import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '.';
import { ToastAndroid } from 'react-native';

const getPostsConfig = ({ page, limit, profileType }) => {
  return {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://madhurmilanservice.up.railway.app/api/posts?page=${page}&limit=${limit}&profileType=${profileType}`,
    headers: {},
  };
};

export const fetchPosts = async (refreshed = false) => {
  let config = getPostsConfig({ page: 1, limit: 10, profileType: 'bride' });
  const data = await AsyncStorage.getItem('profiles');
  if (!data || refreshed) {
    const profiles = await axios.request(config);
    setLocalStorage('profiles', profiles.data);
  }
};

export const fetchMorePosts = async () => {
  const data = await getLocalStorage('profiles');
  if (data.currentPage < data.numberOfPages) {
    let config = getPostsConfig({
      page: data.currentPage + 1,
      limit: 10,
      profileType: 'bride',
    });
    const profiles = await axios.request(config);
    const newData = {
      ...profiles.data,
      data: [...data.data, ...profiles.data.data],
    };
    setLocalStorage('profiles', newData);
  } else {
    console.log('No more profiles to load');
    ToastAndroid.show('No more profiles to load', ToastAndroid.SHORT);
  }
};
