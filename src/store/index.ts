import {applyMiddleware, combineReducers, configureStore, createStore} from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'


const rootReducer = combineReducers({
    userReducer
})

export const setupStore = () =>{
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

/*export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState> //получаем типизацию store.getState
export type AppDispatch = typeof store.dispatch;*/
