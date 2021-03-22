import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Feedback from '../models/Feedback';
import { mongoConnect } from '../dbconn';

import escapeHtml from '../../src/helpers/escapeHtml';

type answerType = {
  [key: string]: string | boolean
}

const addFeedback = async (req: Request, res: Response): Promise<any> => {
  const { user } = res.locals;
  const { message } = req.body;

  let error = false;
  const answer: answerType = {
    ok: false,
    message: '',
  };

  if (!message) {
    error = true;
    answer.message = 'Empty message';
  }

  const userId = user?.id || 0;

  if (!error) {
    mongoConnect();

    const escapeMessage = escapeHtml(message);

    const row = new Feedback({ user_id: userId, message: escapeMessage });

    try {
      await row.save();

      answer.ok = true;
      answer.message = 'Message added';
    } catch (err) {
      answer.message = err;
    }

    mongoose.disconnect();
  }

  res.json(answer);
};

export { addFeedback };
