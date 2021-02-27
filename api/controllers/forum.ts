import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { ForumTopic, ForumPost } from '../models';

const getForumTopics = async (req: Request, res: Response): Promise<any> => {
  const data = await ForumTopic.findAll({ raw: true });

  res.json(data);
};

const getForumTopicPosts = async (req: Request, res: Response): Promise<any> => {
  const { topic_id } = req.body;
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

const addForumTopic = async (req: Request, res: Response): Promise<any> => {
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

  if (!error) {
    await ForumTopic.create({ name, description, user_id: user.id });

    answer.ok = true;
    answer.message = 'Topic created';
  }

  res.json(answer);
};

const addForumPost = async (req: Request, res: Response): Promise<any> => {
  const { user } = res.locals;
  const { name, message, topic_id } = req.body;

  let error = false;
  const answer: answerType = {
    ok: false,
    message: '',
  };

  if (!name) {
    error = true;
    answer.message = 'Name topic not be empty';
  }

  if (!error) {
    await ForumPost.create({
      name, message, topic_id, user_id: user.id,
    });

    answer.ok = true;
    answer.message = 'Post created';
  }

  res.json(answer);
};

export {
  getForumTopics, addForumTopic, addForumPost, getForumTopicPosts,
};
