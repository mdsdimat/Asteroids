import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { ForumTopic, ForumPost } from '../models';

const getTopics = async (req: Request, res: Response): Promise<any> => {
  const data = await ForumTopic.findAll({ raw: true });

  res.json(data);
};

const getTopicPosts = async (req: Request, res: Response): Promise<any> => {
  const { topic_id } = req.query;

  const data = await ForumPost.findAll({
    where: {
      id: {
        [Op.eq]: topic_id,
      },
    },
    raw: true,
  });

  if (!data) {
    res.sendStatus(400);
  }

  res.json(data);
};

type answerType = {
  [key: string]: string | boolean
}

const addTopic = async (req: Request, res: Response): Promise<any> => {
  const { user } = res.locals;
  const { name, description } = req.body;

  let error = false;

  if (!name) {
    error = true;
    res.sendStatus(400).send('Name topic not be empty');
  }

  const user_id = user?.id || 0;

  if (!error) {
    await ForumTopic.create({ name, description, user_id });
  }

  res.send('Topic created');
};

const addTopicPost = async (req: Request, res: Response): Promise<any> => {
  const { user } = res.locals;
  const { message, topic_id } = req.body;

  let error = false;
  const answer: answerType = {
    ok: false,
    message: '',
  };

  if (!topic_id) {
    res.sendStatus(400).send('topic_id is required')
  }

  const topic = await ForumTopic.findOne({
    where: {
      id: {
        [Op.eq]: topic_id,
      },
    }
  })

  if (!topic) {
    res.sendStatus(400)
  }

  //TODO: Написать нормальлную валидацию или подрубить библиотечку по типу YUP
  Object.keys({ message }).forEach(fieldName => {
    if (!req.body[fieldName]) {
      error = true;
      answer.message = (`Post's ${fieldName} is required`);
    }
  })

  const user_id = user?.id || 0;

  if (!error) {
    await ForumPost.create({
      message,
      topic_id,
      user_id,
    });

    answer.ok = true;
    answer.message = 'Post created';

    res.json(answer);
  } else {
    res.sendStatus(400).send(answer.message);
  }

};

export { addTopicPost, addTopic, getTopicPosts, getTopics };
