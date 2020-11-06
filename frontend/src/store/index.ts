import { combineReducers } from 'redux';
import dashboard from './dashboard/index';

export const rootReducer = combineReducers({
  dashboard,
});

export type AppState = ReturnType<typeof rootReducer>;
