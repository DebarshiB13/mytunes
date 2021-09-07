/*
 *
 * TuneContainer reducer
 *
 */
import { translate } from '@app/components/IntlGlobalProvider/index';
import produce from 'immer';
import get from 'lodash/get';
import { createActions } from 'reduxsauce';

export const initialState = { searchTerm: null, songsData: [], songsError: null };

export const { Types: tuneContainerTypes, Creators: tuneContainerCreators } = createActions({
  requestGetItuneSongs: ['searchTerm'],
  successGetItuneSongs: ['data'],
  failureGetItuneSongs: ['error'],
  clearItuneSongs: []
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
        draft.songsError = get(action.error, 'message', translate('something_went_wrong'));
        draft.songsData = [];
        break;
      case tuneContainerTypes.CLEAR_ITUNE_SONGS:
        return initialState;
    }
  });

export default tuneContainerReducer;
