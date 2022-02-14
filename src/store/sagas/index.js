import {all, call, spawn} from 'redux-saga/effects';

export default function* sagas() {
  const sagas = [];

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
      }),
    ),
  );
}
