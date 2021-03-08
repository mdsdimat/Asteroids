import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { ForumTopic, ForumPost } from '../models';

const getTopics = async (req: Request, res: Response): Promise<any> => {
  const data = await ForumTopic.findAll({ raw: true });

  res.json(data);
};

const getTopicPosts = async (req: Request, res: Response): Promise<any> => {
  const { topic_id } = req.query;

  const data = await ForumTopic.findAll({
    where: {
      topic_id: {
        [Op.eq]: topic_id,
      },
    },
    raw: true,
  });

  res.json(data);
};

type answerType = {
  [key: string]: string | boolean
}

const addTopic = async (req: Request, res: Response): Promise<any> => {
  const { user } = res.locals;
  const { name, description } = req.body;

  let error = false;
  const answer: answerType = {
    ok: false,
    message: '',
  };

  if (!name) {
    error = true;
    answer.message = 'Name topic not be empty';
  }

  const user_id = user?.id || 0;

  if (!error) {
    await ForumTopic.create({ name, description, user_id });

    answer.ok = true;
    answer.message = 'Topic created';
  }

  res.json(answer);
};

const addTopicPost = async (req: Request, res: Response): Promise<any> => {
  const { user } = res.locals;
  const { name, message, topic_id } = req.body;

  let error = false;
  const answer: answerType = {
    ok: false,
    message: '',
  };

  //TODO: Написать нормальлную валидацию или подрубить библиотечку по типу YUP
  Object.keys({ name, message }).forEach(fieldName => {
    if (!req.body[fieldName]) {
      error = true;
      answer.message = (`Post's ${fieldName} is required`);
    }
  })

  const user_id = user?.id || 0;

  if (!error) {
    await ForumPost.create({
      name,
      message,
      topic_id,
      user_id,
    });

    answer.ok = true;
    answer.message = 'Post created';
  }

  res.json(answer);
};

export { addTopicPost, addTopic, getTopicPosts, getTopics };
