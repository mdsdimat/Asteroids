import leaderboardActions from '../actions/leaderboard';

interface BaseActionType {
  type: string,
  data: Record<string, unknown>,
  error: Record<string, unknown>
}

export interface LeaderboardState {
  readonly data: {name: string}[];
  readonly loading: boolean;
  readonly error: boolean;
}

export const initialState: LeaderboardState = {
  data: [],
  loading: false,
  error: false,
};
const leaderboardReducer = (state = initialState, action: BaseActionType): Record<string, unknown> => {
  switch (action.type) {
    case leaderboardActions.requested:
      return {
        data: [],
        loading: true,
        error: false,
      };
    case leaderboardActions.succeeded:
      return {
        data: action.data,
        loading: false,
        error: false,
      };
    case leaderboardActions.failed:
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
