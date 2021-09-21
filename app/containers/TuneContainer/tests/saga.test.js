/**
 * Test tuneContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import tuneContainerSaga, { getItuneSongs } from '../saga';
import { tuneContainerTypes } from '../reducer';
import { getSongs } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';

describe('TuneContainer saga tests', () => {
  const generator = tuneContainerSaga();
  let searchTerm = 'alanwalker';
  let getItuneSongsGenerator = getItuneSongs({ searchTerm });

  it('should start task to watch for REQUEST_GET_ITUNE_SONGS', () => {
    expect(generator.next().value).toEqual(takeLatest(tuneContainerTypes.REQUEST_GET_ITUNE_SONGS, getItuneSongs));
  });

  it('should ensure that the action FAILURE_GET_ITUNE_SONGS is dispatched when the api call fails', () => {
    const res = getItuneSongsGenerator.next().value;

    expect(res).toEqual(call(getSongs, searchTerm));
    const errorResponse = {
      errorMessage: 'There was an error while fetching songs informations.'
    };

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
});
