import { getSongs } from '@app/services/repoApi';
import { takeLatest, call, put } from 'redux-saga/effects';
import { tuneContainerCreators, tuneContainerTypes } from './reducer';
// Individual exports for testing
const { REQUEST_GET_ITUNE_SONGS } = tuneContainerTypes;
const { successGetItuneSongs, failureGetItuneSongs } = tuneContainerCreators;

export function* getItuneSongs(action) {
  const response = yield call(getSongs, action.searchTerm);
  const { ok, data } = response;

  if (ok) {
    yield put(successGetItuneSongs(data));
  } else {
    yield put(failureGetItuneSongs(data));
  }
}

export default function* tuneContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNE_SONGS, getItuneSongs);
}
