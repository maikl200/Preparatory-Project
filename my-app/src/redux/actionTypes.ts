export const AUTH_USER = 'AUTH_USER'
export const REG_USER = 'REG_USER'
export const ASYNC_GET_API = 'ASYNC_GET_API'
export const GET_API = 'GET_API'


export type ActionTypes = ActionMapTypes[keyof ActionMapTypes];

type volumeOptional = {
  value: number
  unit: string
}

export type AsyncGetApi = {
  volume: volumeOptional;
  name: string
  description: string
  food_pairing: []
  id: number
  image_url: string
}

export type UserList = {
  email: string
  password: string
}

export type RegUser = {
  fio: string
  password: string
  repeatPassword: string
  email: string
  dateOfBirth: number
}

export type ActionMapTypes = {
  [AUTH_USER]: {
    type: typeof AUTH_USER
    payload: boolean
  }
  [REG_USER]: {
    type: typeof REG_USER
    payload: RegUser
  }
  [ASYNC_GET_API]: {
    type: typeof ASYNC_GET_API
    payload: AsyncGetApi[]
  }
  [GET_API]: {
    type: typeof GET_API
    payload: AsyncGetApi[]
  }
}