import authActions from '../actions/auth';

interface BaseActionType {
  type: string,
  isAuth: boolean
  error: Record<string, unknown>,
  userData: Record<string, unknown>
}

export interface AuthState {
  readonly isAuth: boolean;
  readonly loading: boolean;
  readonly error: boolean;
  readonly isUserInfo: boolean;
  readonly userData: Record<string, unknown>;
}

export const initialState: AuthState = {
  isAuth: false,
  loading: false,
  error: false,
  isUserInfo: false,
  userData: {},
};
const authReducer = (state = initialState, action: BaseActionType) => {
  switch (action.type) {
    case authActions.requested:
      return {
        isAuth: false,
        loading: true,
        error: false,
        isUserInfo: false,
        userData: {},
      };
    case authActions.succeeded:
      return {
        isAuth: action.isAuth,
        loading: false,
        error: false,
        isUserInfo: false,
        userData: {},
      };
    case authActions.failed:
      return {
        isAuth: false,
        loading: false,
        error: true,
        errorData: action.error,
        isUserInfo: false,
        userData: {},
      };
    case authActions.getUserSucceeded:
      return {
        isAuth: action.isAuth,
        loading: false,
        error: false,
        userData: action.userData,
        isUserInfo: true,
      };
    case authActions.yandexAuthSucceeded:
      return {
        isAuth: action.isAuth,
        loading: false,
        error: false,
        isUserInfo: false,
      };
    default:
      return state;
  }
};

export default authReducer;
