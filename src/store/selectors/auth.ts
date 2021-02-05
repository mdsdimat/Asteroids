import { AxiosError } from 'axios';

interface RootState {
  auth: IAuth
}

interface IAuth {
  isAuth: boolean,
  error: boolean,
  errorData: AxiosError
  loading: boolean,
  userData: IUserData,
  isUserInfo: boolean,
}

interface IUserData {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string
}

const authSelector = (state: RootState): IAuth => state.auth;
export default authSelector;
