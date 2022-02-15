import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAction } from '@reduxjs/toolkit';
import { createMigrate } from 'redux-persist';

export const createRequestTypes = base => ({
  REQUEST: createAction(`${base}_REQUEST`),
  SUCCESS: createAction(`${base}_SUCCESS`),
  FAILURE: createAction(`${base}_FAILURE`),
  BASE: base
});

const safeOps = state => {
  if (typeof state.loading !== 'object') {
    state.loading = {};
  }
  if (typeof state.success !== 'object') {
    state.success = {};
  }
  if (typeof state.error !== 'object') {
    state.error = {};
  }
};

export const buildRequestReducer = (builder, actionBase, takeout) => {
  builder
    .addCase(actionBase.REQUEST, state => {
      safeOps(state);

      state.loading[actionBase.BASE] = true;
      state.success[actionBase.BASE] = false;
    })
    .addCase(actionBase.SUCCESS, (state, action) => {
      safeOps(state);

      state.success[actionBase.BASE] = true;
      state.loading[actionBase.BASE] = false;

      if (typeof takeout === 'function') {
        takeout(state, action);
      } else if (takeout?.constructor === Array) {
        takeout.forEach(key => {
          state[key] = action.payload[key];
        });
      }
    })
    .addCase(actionBase.FAILURE, (state, action) => {
      safeOps(state);

      state.error[actionBase.BASE] = action.payload;

      state.loading[actionBase.BASE] = false;
      state.success[actionBase.BASE] = false;
    });
};

export const generatePersistConfig = ({ whitelist = [], version = 1 }) => {
  const migrations = {
    [version]: ({ _persist }) => {
      return { _persist };
    }
  };

  return {
    key: 'root',
    version,
    whitelist: [...whitelist, '_persist'],
    storage: AsyncStorage,
    debug: __DEV__,
    migrate: createMigrate(migrations, { debug: __DEV__ })
  };
};
