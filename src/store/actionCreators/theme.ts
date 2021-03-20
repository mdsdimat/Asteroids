import { AxiosError } from 'axios';
import themeActions from '../actions/theme';
import {
  IErrorType, ISuccessThemeType, ThemeType, IGetTheme,
} from '@types/types';

export const requestTheme = (): { type: string } => ({ type: themeActions.requested });

export const requestThemeSuccess = (name: string): ISuccessThemeType => ({
  type: themeActions.succeeded,
  name,
});

export const requestThemeError = (error: AxiosError): IErrorType => (
  { type: themeActions.failed, error }
);

export const setThemeSaga = (name: string) => ({
  type: themeActions.setTheme,
  name,
});

export const getTheme = (): ISuccessThemeType => ({
  type: themeActions.getTheme
});
