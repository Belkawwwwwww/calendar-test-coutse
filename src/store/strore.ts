import {applyMiddleware, combineReducers, createStore} from "@reduxjs/toolkit";
import reducers from "./reducers";
import thunk from 'redux-thunk'

/*const rootReducer = combineReducers({
    userReducer
})

export const setupStore = () =>{
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']*/

const rootReducer = combineReducers(reducers)

export const store = createStore(rootReducer, applyMiddleware(thunk))


export type RootState = ReturnType<typeof store.getState> //получаем типизацию store.getState
export type AppDispatch = typeof store.dispatch;
