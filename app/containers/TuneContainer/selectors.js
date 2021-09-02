import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the tuneContainer state domain
 */

const selectTuneContainerDomain = state => state.tuneContainer || initialState

const makeSelectTuneContainer = () =>
  createSelector(selectTuneContainerDomain, substate => substate)

export default makeSelectTuneContainer
export { selectTuneContainerDomain }
