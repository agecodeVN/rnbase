import {createReducer} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  user: {},
  token: null,
  isLogged: false,
};

export default createReducer(INITIAL_STATE, builder => {});
