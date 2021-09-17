import { translate } from '@components/IntlGlobalProvider';
import { getSongs, getSongDetails } from '@services/repoApi';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { tuneContainerCreators, tuneContainerTypes } from './reducer';
import { selectSongsData } from './selectors';
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
  let songsData;
  if (action.testSongData) {
    songsData = action.testSongData;
  } else {
    songsData = yield select(selectSongsData());
  }

  const songItem = songsData?.results?.find((song) => song.trackId?.toString() === action.songId);

  if (!songItem) {
    const response = yield call(getSongDetails, action.songId);
    const { ok, data } = response;
    if (ok && data.results.length) {
      yield put(successGetTrackDetails(data.results[0]));
    } else {
      const error = data?.originalError?.message ?? translate('something_went_wrong');
      yield put(failureGetTrackDetails(error));
    }
  } else {
    yield put(successGetTrackDetails(songItem));
  }
}
export default function* tuneContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNE_SONGS, getItuneSongs);
  yield takeLatest(REQUEST_GET_TRACK_DETAILS, getTrackDetails);
}
