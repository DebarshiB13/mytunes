/**
 * Test tuneContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import tuneContainerSaga, { getItuneSongs, getTrackDetails } from '../saga';
import { tuneContainerTypes } from '../reducer';
import { getSongs, getSongDetails } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import { setIntl, translate } from '@components/IntlGlobalProvider';
import getIntl from '@utils/createintl';

describe('TuneContainer saga tests', () => {
  beforeAll(() => {
    setIntl(getIntl());
  });
  const generator = tuneContainerSaga();
  let searchTerm = 'alanwalker';
  let songId = '18556408';
  let getItuneSongsGenerator = getItuneSongs({ searchTerm });
  let getTrackDetailsGenerator = getTrackDetails({ songId });
  let songsData = {
    resultCount: 1,
    results: [{ song: 'abc', trackId: songId }]
  };

  it('should start task to watch for REQUEST_GET_ITUNE_SONGS', () => {
    expect(generator.next().value).toEqual(takeLatest(tuneContainerTypes.REQUEST_GET_ITUNE_SONGS, getItuneSongs));
  });

  it('should ensure that the action FAILURE_GET_ITUNE_SONGS is dispatched when the api call fails', () => {
    const res = getItuneSongsGenerator.next().value;

    expect(res).toEqual(call(getSongs, searchTerm));
    const errorResponse = translate('something_went_wrong');

    expect(getItuneSongsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: tuneContainerTypes.FAILURE_GET_ITUNE_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNE_SONGS is dispatched when the api call succeeds', () => {
    getItuneSongsGenerator = getItuneSongs({ searchTerm });
    const res = getItuneSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, searchTerm));
    const songsResponse = {
      resultsCount: 1,
      results: [{ searchTerm }]
    };
    expect(getItuneSongsGenerator.next(apiResponseGenerator(true, songsResponse)).value).toEqual(
      put({
        type: tuneContainerTypes.SUCCESS_GET_ITUNE_SONGS,
        data: songsResponse
      })
    );
  });

  it('should start task to watch for REQUEST_GET_TRACK_DETAILS', () => {
    expect(generator.next().value).toEqual(takeLatest(tuneContainerTypes.REQUEST_GET_TRACK_DETAILS, getTrackDetails));
  });

  it('should ensure that the action SUCCESS_GET_TRACK_DETAILS is dispatched when the api call succeeds', () => {
    getTrackDetailsGenerator = getTrackDetails({ songId });
    getTrackDetailsGenerator.next().value;
    const resTwo = getTrackDetailsGenerator.next().value;

    expect(resTwo).toEqual(call(getSongDetails, songId));

    const data = { results: [{ songId }] };

    expect(getTrackDetailsGenerator.next(apiResponseGenerator(true, data)).value).toEqual(
      put({
        type: tuneContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        data: data.results[0]
      })
    );
  });

  it('should ensure that the action FAILURE_GET_TRACK_DETAILS is dispatched when the api call fails', () => {
    getTrackDetailsGenerator = getTrackDetails({ songId });
    getTrackDetailsGenerator.next().value;
    const resTwo = getTrackDetailsGenerator.next().value;

    expect(resTwo).toEqual(call(getSongDetails, songId));
    const error = translate('something_went_wrong');

    expect(getTrackDetailsGenerator.next(apiResponseGenerator(false, error)).value).toEqual(
      put({
        type: tuneContainerTypes.FAILURE_GET_TRACK_DETAILS,
        error
      })
    );
  });

  it('should ensure that songsData is selected and SUCCESS_GET_TRACK_DETAILS is dispatched when songsData contains the trackId', () => {
    getTrackDetailsGenerator = getTrackDetails({ songId, testSongData: songsData });
    const res = getTrackDetailsGenerator.next().value;

    expect(res).toEqual(
      put({
        type: tuneContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        data: songsData.results[0]
      })
    );
  });
});
