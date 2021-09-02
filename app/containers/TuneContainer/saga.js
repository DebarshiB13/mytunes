import { takeLatest } from 'redux-saga/effects'
import { tuneContainerTypes } from './reducer'
// Individual exports for testing
const { DEFAULT_ACTION } = tuneContainerTypes

export function *defaultFunction (/* action */) {
  // console.log('Do something here')

}

export default function* tuneContainerSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultFunction)
}