import { AxiosError } from 'axios';

interface RootState {
  auth: IAuth
}

interface IAuth {
  isAuth: boolean,
  error: boolean,
  errorData: AxiosError
  loading: boolean,
  userData: Record<string, unknown>,
  isUserInfo: boolean,
}

const authSelector = (state: RootState): IAuth => state.auth;
export default authSelector;
