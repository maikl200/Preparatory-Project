import {applyMiddleware, createStore} from "redux";
import {combineReducers} from "redux";
import createSagaMiddleware from 'redux-saga'
import {all} from "@redux-saga/core/effects";
import {authReducer} from './reducers/AuthReducer'
import {userReducer} from "./reducers/UserReducer";
import {getAPIWatch} from "./saga";
import {APIReducer} from "./reducers/APIReducer";

const sagaMiddleware = createSagaMiddleware()

export default function* rootSaga() {
  yield all(
    [
      getAPIWatch()
    ])
}

const rootReducer = combineReducers({authReducer, userReducer, APIReducer})

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)