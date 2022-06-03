import {ActionTypes, REG_USER, RegUser} from '../actionTypes'



const defaultState: RegUser[] = []

export const userReducer = (state = defaultState, action: ActionTypes) => {
  switch (action.type) {
    case REG_USER:
      return action.payload
    default:
      return state
  }
}