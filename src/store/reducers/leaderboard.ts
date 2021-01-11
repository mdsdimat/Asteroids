import {
  REQUESTED_LEADERBOARD,
  REQUESTED_LEADERBOARD_FAILED,
  REQUESTED_LEADERBOARD_SUCCEEDED,
} from '../actions/leaderboard';

interface BaseActionType {
  type: string,
  data: Record<string, unknown>,
  error: Record<string, unknown>
}

const initialState = {
  data: [],
  loading: false,
  error: false,
};
const leaderboardReducer = (state = initialState, action: BaseActionType): Record<string, unknown> => {
  switch (action.type) {
    case REQUESTED_LEADERBOARD:
      return {
        data: [],
        loading: true,
        error: false,
      };
    case REQUESTED_LEADERBOARD_SUCCEEDED:
      return {
        data: action.data,
        loading: false,
        error: false,
      };
    case REQUESTED_LEADERBOARD_FAILED:
      return {
        data: [],
        loading: false,
        error: true,
        errorData: action.error,
      };
    default:
      return state;
  }
};

export default leaderboardReducer;
