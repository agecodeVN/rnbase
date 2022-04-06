import { createAction } from '@reduxjs/toolkit';
import { createRequestTypes } from 'utils/redux';

export const SIGNIN = createRequestTypes('SIGNIN');
export const GET_ME = createRequestTypes('GET_ME');
export const UPDATE_ME = createRequestTypes('UPDATE_ME');

export const LOGOUT = createAction('LOGOUT');
