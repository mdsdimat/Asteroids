import axios from 'axios';
import { PasswordRequest, UserRequest, UserResponse } from '../types/types';
import { buildUrl } from '../helpers/ApiHelpers';

class UserApi {
    static editProfile = async (data: UserRequest): Promise<UserRequest> => {
      const url = buildUrl('user/profile');

      const response = await axios({
        method: 'put',
        url,
        withCredentials: true,
        data,
      });

      return response.data;
    }

    static uploadAvatar = async (avatar: File): Promise<void> => {
      const url = buildUrl('user/profile/avatar');

      const formData = new FormData();
      formData.append('avatar', avatar);

      const response = await axios({
        method: 'put',
        headers: {
          'Content-Type': avatar.type,
        },
        url,
        withCredentials: true,
        data: formData,
      });
    }

    static changePassword = async (data: PasswordRequest): Promise<void> => {
      const url = buildUrl('user/password');

      const response = await axios({
        method: 'put',
        url,
        withCredentials: true,
        data,
      });

      return response.data;
    }

    static getUser = async (id: string): Promise<UserResponse> => {
      const url = buildUrl(`user/${id}`);
      const response = await axios.get(url, { withCredentials: true });

      return response.data;
    }

    static findUsers = async (login: string): Promise<UserResponse[]> => {
      const url = buildUrl('user/search');
      const response = await axios.post(url, { login });

      return response.data;
    }
}

export default UserApi;
