import { combineReducers } from 'redux';
import leaderboardReducer from './leaderboard';
import authReducer from './auth';

const reducers = combineReducers({
  leaderboard: leaderboardReducer,
  auth: authReducer,
});

export default reducers;
