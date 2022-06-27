import { takeEvery, put } from 'redux-saga/effects';
import { API } from 'configs/constants';
import { SIGNIN, UPDATE_ME, GET_ME } from 'actions';
import { request, fetchBlob } from 'utils/request';

function* signin(action) {
  const { payload } = action;

  const result = yield request({
    method: 'post',
    params: payload,
    url: API.AUTH.SIGNIN,
    success: SIGNIN.SUCCESS,
    failure: SIGNIN.FAILURE
  });

  yield put(result);
}

function* getMe() {
  const result = yield request({
    method: 'get',
    url: API.AUTH.ME,
    success: GET_ME.SUCCESS,
    failure: GET_ME.FAILURE
  });

  yield put(result);
}

function* updateMe(action) {
  const { payload } = action;

  const result = yield fetchBlob({
    method: 'post',
    body: payload,
    uri: API.AUTH.ME,
    success: UPDATE_ME.SUCCESS,
    failure: UPDATE_ME.FAILURE
  });

  yield put(result);
}

export default function* watchAuth() {
  yield takeEvery(SIGNIN.REQUEST.type, signin);
  yield takeEvery(GET_ME.REQUEST.type, getMe);
  yield takeEvery(UPDATE_ME.REQUEST.type, updateMe);
}
