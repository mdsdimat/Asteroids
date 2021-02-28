import axios from 'axios';
import { apiUrl } from '@helpers/ApiHelpers';
import { TopicAddFields } from '../types/types';

class ForumApi {
  static getTopics = async (): Promise<void> => {
    const url = apiUrl('forum/topics');

    const response = await axios.post(url, {}, { withCredentials: true });

    return response.data;
  }

  static addTopic = async (values: TopicAddFields): Promise<void> => {
    const url = apiUrl('forum/topic');

    const response = await axios.post(url, values, { withCredentials: true });

    return response.data;
  }
}

export default ForumApi;
