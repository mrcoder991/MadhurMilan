import { REDUX_STATE_STATUS } from '../../constants';
import {
  CLEAR_SEARCH,
  FETCH_MORE_PROFILES,
  FETCH_MORE_PROFILES_FAILURE,
  FETCH_MORE_PROFILES_SUCCESS,
  FETCH_PROFILES,
  FETCH_PROFILES_BY_SEARCH,
  FETCH_PROFILES_BY_SEARCH_FAILURE,
  FETCH_PROFILES_BY_SEARCH_SUCCESS,
  FETCH_PROFILES_FAILURE,
  FETCH_PROFILES_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../actions';

const initialState = {
  profilesData: {},
  profilesDataStatus: REDUX_STATE_STATUS.NOT_STARTED,
  userLoginStatus: REDUX_STATE_STATUS.NOT_STARTED,
  userData: {},
  profilesSearchData: {},
  profilesSearchStatus: REDUX_STATE_STATUS.NOT_STARTED,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userLoginStatus: REDUX_STATE_STATUS.STARTED,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userLoginStatus: REDUX_STATE_STATUS.SUCCESS,
        userData: action.payload,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        userLoginStatus: REDUX_STATE_STATUS.FAILURE,
      };
    case USER_LOGOUT:
      return {
        ...state,
        userData: {},
        profilesData: {},
      };
    case FETCH_PROFILES:
      return {
        ...state,
        profilesDataStatus: REDUX_STATE_STATUS.STARTED,
      };
    case FETCH_PROFILES_SUCCESS:
      return {
        ...state,
        profilesDataStatus: REDUX_STATE_STATUS.SUCCESS,
        profilesData: action.payload,
      };
    case FETCH_PROFILES_FAILURE:
      return {
        ...state,
        profilesDataStatus: REDUX_STATE_STATUS.FAILURE,
      };
    case FETCH_PROFILES_BY_SEARCH:
      return {
        ...state,
        profilesSearchStatus: REDUX_STATE_STATUS.STARTED,
      };
    case FETCH_PROFILES_BY_SEARCH_SUCCESS:
      return {
        ...state,
        profilesSearchStatus: REDUX_STATE_STATUS.SUCCESS,
        profilesSearchData: action.payload,
      };
    case FETCH_PROFILES_BY_SEARCH_FAILURE:
      return {
        ...state,
        profilesSearchStatus: REDUX_STATE_STATUS.FAILURE,
      };
    case FETCH_MORE_PROFILES:
      return {
        ...state,
        profilesDataStatus: REDUX_STATE_STATUS.STARTED,
      };
    case FETCH_MORE_PROFILES_SUCCESS:
      return {
        ...state,
        profilesDataStatus: REDUX_STATE_STATUS.SUCCESS,
        profilesData: {
          ...action.payload,
          data: [...state.profilesData.data, ...action.payload.data],
        },
      };
    case FETCH_MORE_PROFILES_FAILURE:
      return {
        ...state,
        profilesDataStatus: REDUX_STATE_STATUS.FAILURE,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        profilesSearchData: {},
      };
    default:
      return state;
  }
};

export default appReducer;
