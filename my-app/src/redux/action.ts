import {AUTH_USER, REG_USER, ASYNC_GET_API, GET_API, AsyncGetApi, UserList} from "./actionTypes";

export const loginUsers = (payload: boolean) => ({
  type: AUTH_USER,
  payload
})

export const UserReg = (payload: UserList[]) => ({
  type: REG_USER,
  payload
})

export const asyncGetAPI = () => ({
  type: ASYNC_GET_API
})

export const getAPI = (payload: AsyncGetApi[]) => ({
  type: GET_API,
  payload
})