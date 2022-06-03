import {ActionTypes, AUTH_USER} from '../actionTypes'

const defaultState: ActionTypes = JSON.parse(localStorage.getItem('IS_AUTH') || '')

export const authReducer = (state = defaultState, action: ActionTypes) => {
  switch (action.type) {
    case AUTH_USER:
      return action.payload
    default:
      return state
  }
}