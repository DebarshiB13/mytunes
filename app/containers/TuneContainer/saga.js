import { translate } from '@components/IntlGlobalProvider';
import { getSongs, getSongDetails } from '@services/repoApi';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { tuneContainerCreators, tuneContainerTypes } from './reducer';
import { selectTracksCache } from './selectors';
// Individual exports for testing
const { REQUEST_GET_ITUNE_SONGS, REQUEST_GET_TRACK_DETAILS } = tuneContainerTypes;
const { successGetItuneSongs, failureGetItuneSongs, successGetTrackDetails, failureGetTrackDetails } =
  tuneContainerCreators;

export function* getItuneSongs(action) {
  const response = yield call(getSongs, action.searchTerm);
  const { ok, data } = response;

  if (ok) {
    yield put(successGetItuneSongs(data));
  } else {
    const error = data?.originalError?.message ?? translate('something_went_wrong');
    yield put(failureGetItuneSongs(error));
  }
}

export function* getTrackDetails(action) {
  let songsCache;

  if (action.testSagaCache) {
    songsCache = action.testSagaCache;
  } else {
    songsCache = yield select(selectTracksCache());
  }

  if (songsCache && !songsCache[action.songId]) {
    const response = yield call(getSongDetails, action.songId);
    const { ok, data } = response;

    if (ok && data.results.length !== 0) {
      const _data = { ...data.results[0] };
      yield put(successGetTrackDetails(_data));
    } else {
      const error = data?.originalError?.message ?? translate('something_went_wrong');
      yield put(failureGetTrackDetails(error));
    }
  } else {
    const data = { ...songsCache[action.songId] };
    yield put(successGetTrackDetails(data));
  }
}
export default function* tuneContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNE_SONGS, getItuneSongs);
  yield takeLatest(REQUEST_GET_TRACK_DETAILS, getTrackDetails);
}
