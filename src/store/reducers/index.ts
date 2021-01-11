import { combineReducers } from 'redux';
import leaderboardReducer from './leaderboard';

const reducers = combineReducers({
  leaderboardReducer,
});

export default reducers;
