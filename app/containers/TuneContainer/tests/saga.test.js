/**
 * Test tuneContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import tuneContainerSaga, { defaultFunction } from '../saga';
import { tuneContainerTypes } from '../reducer';

describe('TuneContainer saga tests', () => {
  const generator = tuneContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(tuneContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
