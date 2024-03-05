import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoReducer from "./todo/redux/todoSlice";

const rootReducer = combineReducers({
    todos: todoReducer
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;