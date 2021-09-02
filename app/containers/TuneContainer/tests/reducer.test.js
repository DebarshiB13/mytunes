// import produce from 'immer'
import { tuneContainerReducer, tuneContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('TuneContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(tuneContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...state, somePayload: 'Mohammed Ali Chherawalla' };
    expect(
      tuneContainerReducer(state, {
        type: tuneContainerTypes.DEFAULT_ACTION,
        somePayload: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
