import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';
/**
 * Direct selector to the tuneContainer state domain
 */

const selectTuneContainerDomain = (state) => state.tuneContainer || initialState;

export const selectTuneContainer = () => createSelector(selectTuneContainerDomain, (substate) => substate);

export const selectSongsData = () =>
  createSelector(selectTuneContainerDomain, (substate) => get(substate, 'songsData', null));

export const selectSongsError = () =>
  createSelector(selectTuneContainerDomain, (substate) => get(substate, 'songsError', null));

export const selectSearchTerm = () =>
  createSelector(selectTuneContainerDomain, (substate) => get(substate, 'searchTerm', null));

export default selectTuneContainer;
