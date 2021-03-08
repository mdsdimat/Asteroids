import axios from 'axios';
import { apiUrl } from '@helpers/ApiHelpers';
import {Post, Topic, TopicAddFields, TopicPostAddFields} from '../types/types';

class ForumApi {
  static getTopics = async (): Promise<Topic[]> => {
    const url = apiUrl('forum/topics');

    const response = await axios.get(url, { withCredentials: true });

    return response.data;
  }

  static addTopic = async (topic: TopicAddFields): Promise<void> => {
    const url = apiUrl('forum/topic');

    const response = await axios.post(url, topic, { withCredentials: true });

    return response.data;
  }

  static getPosts = async (topic_id: number): Promise<Post[]> => {
    const url = apiUrl('forum/posts');

    const response = await axios({
      url,
      withCredentials: true,
      params: {topic_id},
    });

    return response.data;
  }

  static addPost = async (topic_id: string, post: TopicPostAddFields): Promise<void> => {
    const url = apiUrl('forum/posts');

    const response = await axios.post(url, {topic_id, ...post}, { withCredentials: true });

    return response.data;
  }
}

export default ForumApi;
