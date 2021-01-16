import authActions from '../actions/auth';

interface BaseActionType {
  type: string,
  isAuth: boolean
  error: Record<string, unknown>,
  userData: Record<string, unknown>
}

const initialState = {
  isAuth: false,
  loading: false,
  error: false,
  isUserInfo: false,
  userData: {},
};
const authReducer = (state = initialState, action: BaseActionType): Record<string, unknown> => {
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
    default:
      return state;
  }
};

export default authReducer;
