/*
 *
 * TuneContainer reducer
 *
 */
import produce from 'immer'
import { createActions } from 'reduxsauce'

export const initialState = {}

export const { Types: tuneContainerTypes, Creators: tuneContainerCreators } = createActions({
  defaultAction: ['somePayload']
})

/* eslint-disable default-case, no-param-reassign */
export const tuneContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case tuneContainerTypes.DEFAULT_ACTION:
        return {...state, somePayload: action.somePayload}
      default:
        return state
    }
  })

export default tuneContainerReducer
