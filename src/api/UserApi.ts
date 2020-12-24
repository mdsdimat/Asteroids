import axios from 'axios';
import {PasswordRequest, UserRequest, UserResponse} from "../types/types";
import {buildUrl} from "../helpers/ApiHelpers";

class UserApi {
    static editProfile = async (data: UserRequest): Promise<UserRequest> => {
        const url = buildUrl('user/profile');
        const response = await axios.put(url, data);

        return response.data;
    }

    static uploadAvatar = async (avatar: File): Promise<void> => {
        const url = buildUrl('user/profile/avatar');
        await axios.put(url, avatar);

        return;
    }

    static changePassword = async (data: PasswordRequest): Promise<void> => {
        const url = buildUrl('user/password');
        await axios.put(url, data);

        return;
    }

    static getUser = async (id: string): Promise<UserResponse> => {
        const url = buildUrl(`user/${id}`);
        const response = await axios.get(url, {withCredentials: true});

        return response.data;
    }

    static findUsers = async (login: string): Promise<UserResponse[]> => {
        const url = buildUrl('user/search');
        const response = await axios.post(url, {login});

        return response.data;
    }
}

export default UserApi;
