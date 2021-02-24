import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import leaderboardReducer from './leaderboard';
import authReducer from './auth';
import themeReducer from './theme';
import { State } from '../../types';

export default (history: History) =>
  // я combineReducers<State> не могу использовать проблемы с типами
  combineReducers<State>({
    auth: authReducer,
    leaderboard: leaderboardReducer,
    theme: themeReducer,
    router: connectRouter(history),
  });
