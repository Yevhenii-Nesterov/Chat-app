import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import preloadedState from './initial-state';
import {combineReducers} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory, History} from 'history';
import thunk from 'redux-thunk';
import chatsReducer from '../modules/chats';

export const history = createBrowserHistory();

const createRootReducer = (history: History<unknown>) => combineReducers({
  router: connectRouter(history),
  chats: chatsReducer,
});

export const rootReducer = createRootReducer(history);


const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history), thunk)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;

export default store;