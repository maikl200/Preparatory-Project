import {ActionTypes, AsyncGetApi, GET_API} from '../actionTypes'

type DefaultStateType = AsyncGetApi[] | []

const defaultState: DefaultStateType = []

export const APIReducer = (state = defaultState, action: ActionTypes): DefaultStateType => {
  switch (action.type) {
    case GET_API:
      return action.payload

    default:
      return state
  }
}