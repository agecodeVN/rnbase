import { combineReducers } from 'redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { generatePersistConfig } from 'utils';
import createSagaMiddleware from 'redux-saga';

import rootSaga from 'sagas';

import auth from 'reducers/auth';

const reducers = combineReducers({ auth });

const version = 22040601;

const persistedReducer = persistReducer(
  generatePersistConfig({
    whitelist: ['auth'],
    version
  }),
  reducers
);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    });

    middlewares.push(sagaMiddleware);

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      // const createDebugger = require('redux-flipper').default
      // middlewares.push(createDebugger())
    }

    return middlewares;
  }
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
