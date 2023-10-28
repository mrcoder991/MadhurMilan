import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { composeWithDevTools } from 'remote-redux-devtools';

import appReducer from '../reducers/appReducer';

const persistConfig = {
  key: 'app',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const composeEnhancers = composeWithDevTools({ trace: true });

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
const persistor = persistStore(store);

export { store, persistor };
