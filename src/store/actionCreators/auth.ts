import { AxiosError } from 'axios';
import authActions from '../actions/auth';
import {
  IAuthSuccess, IErrorType, ILoginResult, ILoginSuccessType, IYandexOAuth, SignUser, CookiesType
} from '../../types/types';

export const requestAuth = (): { type: string } => ({ type: authActions.requested });

export const requestAuthSuccess = (isAuth: boolean): ILoginSuccessType => ({
  type: authActions.succeeded,
  isAuth,
});

export const requestAuthError = (error: AxiosError): IErrorType => (
  { type: authActions.failed, error }
);

export const login = (values: SignUser): ILoginResult => ({
  type: authActions.login,
  values,
});

export const getUser = (): { type: string } => ({
  type: authActions.getUser,
});

export const getUserServer = (cookies: CookiesType): { type: string, cookies: CookiesType } => ({
  type: authActions.getUser,
  cookies
});

export const getUserSuccess = (isAuth: boolean, userData: Record<string, unknown>)
  : IAuthSuccess => ({
  type: authActions.getUserSucceeded,
  isAuth,
  userData,
});

export const yandexAuth = (code: string): IYandexOAuth => ({
  type: authActions.yandexAuth,
  code,
});

export const yandexAuthSuccess = (isAuth: boolean): ILoginSuccessType => ({
  type: authActions.yandexAuthSucceeded,
  isAuth,
});
