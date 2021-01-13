import { combineReducers } from 'redux';
import leaderboardReducer from './leaderboard';

const reducers = combineReducers({
  leaderboard: leaderboardReducer,
});

export default reducers;
