/*
 *
 * TuneContainer reducer
 *
 */

import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  searchTerm: null,
  songsData: [],
  songsError: null,
  songId: null,
  trackDetails: {},
  trackError: null,
  tracksCache: {}
};

export const { Types: tuneContainerTypes, Creators: tuneContainerCreators } = createActions({
  requestGetItuneSongs: ['searchTerm'],
  successGetItuneSongs: ['data'],
  failureGetItuneSongs: ['error'],
  clearItuneSongs: [],
  requestGetTrackDetails: ['songId'],
  successGetTrackDetails: ['data'],
  failureGetTrackDetails: ['error']
});

/* eslint-disable default-case, no-param-reassign */
export const tuneContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case tuneContainerTypes.REQUEST_GET_ITUNE_SONGS:
        draft.searchTerm = action.searchTerm;
        break;
      case tuneContainerTypes.SUCCESS_GET_ITUNE_SONGS:
        draft.songsData = action.data;
        draft.songsError = null;
        break;
      case tuneContainerTypes.FAILURE_GET_ITUNE_SONGS:
        draft.songsError = action.error;
        draft.songsData = [];
        break;
      case tuneContainerTypes.REQUEST_GET_TRACK_DETAILS:
        draft.songId = action.songId;
        break;
      case tuneContainerTypes.SUCCESS_GET_TRACK_DETAILS:
        draft.trackError = null;
        draft.tracksCache[draft.songId] = action.data;
        draft.trackDetails = action.data;
        break;
      case tuneContainerTypes.FAILURE_GET_TRACK_DETAILS:
        draft.trackDetails = {};
        draft.trackError = action.error;
        break;
      case tuneContainerTypes.CLEAR_ITUNE_SONGS:
        return initialState;
    }
  });

export default tuneContainerReducer;
