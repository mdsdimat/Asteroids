import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import leaderboardReducer from './leaderboard';
import authReducer from './auth';
import { State } from '../../types';

export default (history: History) =>
  // я combineReducers<State> не могу использовать проблемы с типами
  combineReducers<State>({
    auth: authReducer,
    leaderboard: leaderboardReducer,
    router: connectRouter(history),
  });
