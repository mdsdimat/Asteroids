import axios from 'axios';
import { apiUrl } from '@helpers/ApiHelpers';
import { FeedbackFields } from '../types/types';

class FeedbackApi {
  static sendMessage = async (values: FeedbackFields): Promise<void> => {
    const url = apiUrl('feedback');

    const response = await axios.post(url, values, { withCredentials: true });

    return response.data;
  }
}

export default FeedbackApi;
