import { REDUX_STATE_STATUS } from '../../constants';
import {
  FETCH_MORE_PROFILES,
  FETCH_MORE_PROFILES_FAILURE,
  FETCH_MORE_PROFILES_SUCCESS,
  FETCH_PROFILES,
  FETCH_PROFILES_FAILURE,
  FETCH_PROFILES_SUCCESS,
} from '../actions';

const initialState = {
  profilesData: {},
  profilesDataStatus: REDUX_STATE_STATUS.NOT_STARTED,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default appReducer;
