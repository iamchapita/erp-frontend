import {compose, configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';


const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: [thunk],
    devTools: composeEnhancers()
});