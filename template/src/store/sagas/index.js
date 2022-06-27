import { all, call, spawn } from 'redux-saga/effects';

import authWatch from './auth';

export default function* sagas() {
  const sagas = [authWatch];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
