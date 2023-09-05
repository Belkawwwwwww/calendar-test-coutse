import {applyMiddleware, combineReducers, createStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
const rootReducer = combineReducers({

})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState> //получаем типизацию store.getState
export type AppDispatch = typeof store.dispatch;
