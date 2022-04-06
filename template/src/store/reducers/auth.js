import { createReducer } from '@reduxjs/toolkit';

import { buildRequestReducer } from 'utils/redux';
import { SIGNIN, GET_ME, UPDATE_ME, LOGOUT } from 'actions';
import { setDefaultHeaders } from 'services/axios';

const INITIAL_STATE = {
  user: {},
  token: null,
  isLogged: false
};

export default createReducer(INITIAL_STATE, builder => {
  buildRequestReducer(builder, SIGNIN, ['user', 'token']);
  buildRequestReducer(builder, GET_ME, ['user']);
  buildRequestReducer(builder, UPDATE_ME, ['user']);

  builder
    .addCase(LOGOUT, () => {
      (async () => {
        setDefaultHeaders({
          Authorization: ''
        });
      })();
      return INITIAL_STATE;
    })
    .addMatcher(
      action => action.type === SIGNIN.SUCCESS.type,
      (state, action) => {
        const { token } = action.payload;
        setDefaultHeaders({ Authorization: `Bearer ${token}` });
        return {
          ...state,
          isLogged: true
        };
      }
    );
});
