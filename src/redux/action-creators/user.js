import { ToastAndroid } from 'react-native';
import { API_BASE_PATH, SCREENS } from '../../constants';
import {
  checkStatus,
  createOptions,
  parseJSON,
} from '../../utils/fetchHelpers';
import {
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../actions';

export function userLogin({ memberRegistrationId, password }, navigation) {
  return function userLoginThunk(dispatch) {
    const options = createOptions('POST', { memberRegistrationId, password });
    const url = `${API_BASE_PATH}/api/user/signin`;
    dispatch({ type: USER_LOGIN });
    return fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
        navigation.replace(SCREENS.HOME_WRAPPER);
      })
      .catch(error => {
        dispatch({
          type: USER_LOGIN_FAILURE,
          payload: error,
          error: true,
        });
        console.log(error);
        ToastAndroid.show(
          error.errorData.message || 'Something Unextected Happened',
          ToastAndroid.SHORT,
        );
      });
  };
}

export function userLogout(navigation) {
  return function userLogoutThunk(dispatch) {
    dispatch({ type: USER_LOGOUT });
    if (navigation) {
      navigation.replace(SCREENS.LOGIN);
    }
  };
}
