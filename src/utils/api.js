import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getLocalStorage, setLocalStorage } from '.';
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
  try {
    let config = getPostsConfig({ page: 1, limit: 10, profileType: 'groom' });
    const data = await AsyncStorage.getItem('profiles');
    if (!data || refreshed) {
      const profiles = await axios.request(config);
      setLocalStorage('profiles', profiles.data);
    }
  } catch (error) {
    console.log(error);
    ToastAndroid.show('Failed to Load Profiles', ToastAndroid.SHORT);
  }
};

export const fetchMorePosts = async () => {
  try {
    const data = await getLocalStorage('profiles');
    if (data.currentPage < data.numberOfPages) {
      let config = getPostsConfig({
        page: data.currentPage + 1,
        limit: 10,
        profileType: 'groom',
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
  } catch (error) {
    console.log(error);
    ToastAndroid.show('Failed to load More Posts', ToastAndroid.SHORT);
  }
};

export const login = async ({ memberRegistrationId, password }) => {
  try {
    let headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    };

    let bodyContent = JSON.stringify({ memberRegistrationId, password });

    let reqOptions = {
      url: 'https://madhurmilanservice.up.railway.app/api/user/signin',
      method: 'POST',
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);
  } catch (error) {
    console.log(error);
    ToastAndroid.show('Login Failed', ToastAndroid.SHORT);
  }
};
