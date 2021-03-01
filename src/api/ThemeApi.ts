import { apiAxios } from './axios';
import { ThemeResponse, DefaultApiResponse } from '@types/types';

class ThemeApi {
  static setTheme = async (name: string): Promise<DefaultApiResponse> => {
    const response = await apiAxios('user/theme', {
      method: 'post',
      data: { theme: name },
    });

    return response.data;
  }

  static getTheme = async (): Promise<ThemeResponse> => {
    const response = await apiAxios('user/theme');

    return response.data;
  }
}

export default ThemeApi;
