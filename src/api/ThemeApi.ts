import axios, { AxiosRequestConfig } from 'axios';
import { apiUrl } from '@helpers/ApiHelpers';
import CookieToString from '@helpers/CookieToString';
import {
  ThemeResponse, CookiesType,
} from '../types/types';

class ThemeApi {
  static setTheme = async (name: string): Promise<void> => {
    const url = apiUrl('user/theme');
    const response = await axios.post(url, { theme: name }, { withCredentials: true });

    return response.data;
  }

  static getTheme = async (cookies?: CookiesType): Promise<ThemeResponse> => {
    const url = apiUrl('user/theme');

    const params: AxiosRequestConfig = { withCredentials: true };

    if (cookies) {
      params.headers = {
        Cookie: CookieToString(cookies),
      };
    }

    const response = await axios.get(url, params);

    return response.data;
  }
}

export default ThemeApi;
