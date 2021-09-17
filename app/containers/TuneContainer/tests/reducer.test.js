// import produce from 'immer'
import { tuneContainerReducer, tuneContainerTypes, initialState } from '../reducer';
import { setIntl, translate } from '@components/IntlGlobalProvider';
import getIntl from '@utils/createintl';

/* eslint-disable default-case, no-param-reassign */
describe('TuneContainer reducer tests', () => {
  let state;
  beforeAll(() => {
    setIntl(getIntl());
  });
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(tuneContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_SONG is dispatched', () => {
    const searchTerm = 'alanwalker';
    const expectedResult = { ...state, searchTerm };
    expect(
      tuneContainerReducer(state, {
        type: tuneContainerTypes.REQUEST_GET_ITUNE_SONGS,
        searchTerm
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the song data is present and songLoading = false when FETCH_SONG_SUCCESS is dispatched', () => {
    const data = { name: 'Sia' };
    const expectedResult = { ...state, songsData: data };
    expect(
      tuneContainerReducer(state, {
        type: tuneContainerTypes.SUCCESS_GET_ITUNE_SONGS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the songErrorMessage has some data and songLoading = false when FETCH_SONG_FAILURE is dispatched', () => {
    const error = translate('something_went_wrong');
    const expectedResult = { ...state, songsError: error };
    expect(
      tuneContainerReducer(state, {
        type: tuneContainerTypes.FAILURE_GET_ITUNE_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that songsData is empty when CLEAR_SONG is dispatched', () => {
    const expectedResult = { ...state, songsData: [] };
    expect(
      tuneContainerReducer(state, {
        type: tuneContainerTypes.CLEAR_ITUNE_SONGS,
        expectedResult
      })
    ).toEqual(expectedResult);
  });

  it('should update the state with songId when an action of type FETCH_TRACK_DETAILS is dispatched', () => {
    const songId = '918556408';
    const expectedResult = { ...state, songId };

    expect(
      tuneContainerReducer(state, {
        type: tuneContainerTypes.REQUEST_GET_TRACK_DETAILS,
        songId
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the trackDetails is set when FETCH_TRACK_DETAILS_SUCCESS is dispatched', () => {
    const songId = '12212';
    const data = { name: 'Sia' };
    state = { ...state, songId };
    const expectedResult = { ...state, trackDetails: data };

    expect(
      tuneContainerReducer(state, {
        type: tuneContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that trackDetails empty & trackError is set when FETCH_TRACK_DETAILS_FAILED is dispatched', () => {
    const error = translate('something_went_wrong');

    const expectedResult = { ...state, trackError: error };

    expect(
      tuneContainerReducer(state, {
        type: tuneContainerTypes.FAILURE_GET_TRACK_DETAILS,
        error
      })
    ).toEqual(expectedResult);
  });
});
