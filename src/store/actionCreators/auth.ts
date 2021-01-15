import { AxiosError } from 'axios';
import authActions from '../actions/auth';
import { SignUser } from '../../types/types';

interface ISuccessType {
  type: string,
  isAuth: boolean
}

interface IErrorType {
  type: string,
  error: AxiosError
}

interface ILoginResult {
  type: string,
  values: SignUser
}

interface IAuthSuccess {
  type: string,
  isAuth: boolean,
  userData: Record<string, unknown>
}

export const requestAuth = (): { type: string } => ({ type: authActions.requested });

export const requestAuthSuccess = (isAuth: boolean): ISuccessType => ({
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

export const getUserSuccess = (isAuth: boolean, userData: Record<string, unknown>): IAuthSuccess => ({
  type: authActions.getUserSucceeded,
  isAuth,
  userData,
});
