import { FeedbackFields, DefaultApiResponse } from '@types/types';
import { apiAxios } from './axios';

class FeedbackApi {
  static sendMessage = async (values: FeedbackFields): Promise<DefaultApiResponse> => {
    const response = await apiAxios('feedback', {
      method: 'post',
      data: values,
    });

    return response.data;
  }
}

export default FeedbackApi;
