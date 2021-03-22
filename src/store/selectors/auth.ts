import { AxiosError } from 'axios';

type RootState = {
  auth: IAuth
}

type IAuth = {
  isAuth: boolean,
  error: boolean,
  errorData: AxiosError
  loading: boolean,
  userData: IUserData,
  isUserInfo: boolean,
}

type IUserData = {
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
