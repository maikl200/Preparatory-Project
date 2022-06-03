import {ASYNC_GET_API, AsyncGetApi} from "../actionTypes";
import {put, takeLeading} from '@redux-saga/core/effects'
import axios from "axios";
import {getAPI} from "../action";

interface ResponseGenerator {
  data: AsyncGetApi[]
}

export function* getAPIWorker() {
  const response: ResponseGenerator = yield axios('https://api.punkapi.com/v2/beers')
  try {
    yield put(getAPI(response.data))
    localStorage.setItem('API', JSON.stringify(response.data))
  } catch (e) {
    console.error(e)
  }
}


export function* getAPIWatch() {
  yield takeLeading(ASYNC_GET_API, getAPIWorker)
}