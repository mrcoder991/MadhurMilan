import { ToastAndroid } from 'react-native';
import { API_BASE_PATH, REDUX_STATE_STATUS } from '../../constants';
import {
  checkStatus,
  createOptions,
  parseJSON,
} from '../../utils/fetchHelpers';
import {
  FETCH_MORE_PROFILES,
  FETCH_MORE_PROFILES_FAILURE,
  FETCH_MORE_PROFILES_SUCCESS,
  FETCH_PROFILES,
  FETCH_PROFILES_FAILURE,
  FETCH_PROFILES_SUCCESS,
} from '../actions';

const getProfileType = userData => {
  return userData.profileFor.toLowerCase() === 'bride' ? 'groom' : 'bride';
};

export function getProfiles(isRefresh = false) {
  return function getProfilesThunk(dispatch, getState) {
    const options = createOptions('GET');
    const { profilesData, profilesDataStatus, userData } = getState();
    if (
      profilesData.data &&
      profilesData.data.length > 0 &&
      profilesDataStatus === REDUX_STATE_STATUS.SUCCESS &&
      !isRefresh
    ) {
      return;
    }
    const profileFor = getProfileType(userData);
    const url = `${API_BASE_PATH}/api/posts?page=${1}&limit=${10}&profileType=${profileFor}`;
    dispatch({ type: FETCH_PROFILES });
    return fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        dispatch({
          type: FETCH_PROFILES_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_PROFILES_FAILURE,
          payload: error,
          error: true,
        });
        ToastAndroid.show('Failed to get Posts', ToastAndroid.SHORT);
      });
  };
}

export function getMoreProfiles() {
  return function getMoreProfilesThunk(dispatch, getState) {
    const options = createOptions('GET');
    const { profilesData, userData } = getState();

    if (profilesData.currentPage >= profilesData.numberOfPages) {
      console.log('No more profiles to load');
      ToastAndroid.show('No more profiles to load', ToastAndroid.SHORT);
      return;
    }
    const page = profilesData.currentPage + 1;
    const profileFor = getProfileType(userData);
    const url = `${API_BASE_PATH}/api/posts?page=${page}&limit=${10}&profileType=${profileFor}`;
    dispatch({ type: FETCH_MORE_PROFILES });
    return fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        dispatch({
          type: FETCH_MORE_PROFILES_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_MORE_PROFILES_FAILURE,
          payload: error,
          error: true,
        });
        ToastAndroid.show('Failed to load More Posts', ToastAndroid.SHORT);
      });
  };
}
