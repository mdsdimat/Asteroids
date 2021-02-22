import { NextFunction, Request, Response } from 'express';
import { ThemeModel } from '../models/Theme';

const getThemes = async (req: Request, res: Response, next: NextFunction) => {
  /* if (!_res.locals.user) {
    _res.json({ reason: 'Cookie is not valid' });
  } */

  const data = await ThemeModel.findAll({ raw: true });

  res.json(data);
};

export { getThemes };
