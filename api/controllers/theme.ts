import { NextFunction, Request, Response } from 'express';
import Theme from '../models/Theme';
import UserTheme from '../models/UserTheme';

const getThemes = async (req: Request, res: Response, next: NextFunction) => {
  /* if (!_res.locals.user) {
    _res.json({ reason: 'Cookie is not valid' });
  } */

  const data = await Theme.findAll({ raw: true });

  res.json(data);
};

const getTheme = async (req: Request, res: Response) => {
  /* if (!res.locals.user) {
    _res.json({ reason: 'Cookie is not valid' });
  } */
  const { user } = res.locals;

  let theme = {};

  if (user) {
    Theme.hasMany(UserTheme);
    UserTheme.belongsTo(Theme);

    const data = await UserTheme.findOne({
      include: [
        {
          model: Theme,
          attributes: ['name', 'params'],
        },
      ],
      where: { user_id: user.id },
    });

    if (data) {
      theme = {
        id: data.theme_id,
        name: data.theme.name,
        params: data.theme.params,
      };
    }
  }

  if (Object.keys(theme).length === 0) {
    theme = await Theme.findOne({ raw: true });
  }

  res.json(theme);
};

export { getThemes, getTheme };
