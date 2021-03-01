import themeActions from '../actions/theme';
import { ThemeType } from '@types/types'

interface BaseActionType {
  type: string,
  error: Record<string, unknown>,
  name: string
}

export interface ThemeState {
  readonly name: string;
  readonly loading: boolean;
  readonly error: boolean;
}

export const initialState: ThemeState = {
  loading: false,
  error: false,
  name: 'light',
};

const themeReducer = (state = initialState, action: BaseActionType): ThemeState => {
  switch (action.type) {
    case themeActions.requested:
      return {
        ...initialState,
        loading: true,
      };
    case themeActions.succeeded:
      return {
        ...initialState,
        loading: false,
        name: action.name,
      };
    case themeActions.failed:
      return {
        ...initialState,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default themeReducer;
