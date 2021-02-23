import { Request, Response } from 'express';
import Theme from '../models/Theme';
import UserTheme from '../models/UserTheme';

const getThemes = async (req: Request, res: Response): Promise<any> => {
  const data = await Theme.findAll({ raw: true });

  res.json(data);
};

const getTheme = async (req: Request, res: Response): Promise<any> => {
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

type answerType = {
  [key: string]: string | boolean
}

const changeTheme = async (req: Request, res: Response): Promise<any> => {
  const { user } = res.locals;
  const { theme } = req.body;

  let error = false;
  const answer: answerType = {
    ok: false,
    message: '',
  };

  if (!user) {
    error = true;
    answer.message = 'Cookie is not valid';
  }

  if (!theme) {
    error = true;
    answer.message = 'Theme not set';
  }

  let themeId = null;
  if (user && theme) {
    const arTheme = await Theme.findOne({ where: { id: theme } });
    if (!arTheme) {
      error = true;
      answer.message = 'Theme not found';
    } else {
      themeId = arTheme.id;
    }
  }

  if (!error) {
    await UserTheme.destroy({ where: { user_id: user.id } });
    await UserTheme.create({ user_id: user.id, theme_id: themeId });

    answer.ok = true;
    answer.message = 'Theme change';
  }

  res.json(answer);
};

export { getThemes, getTheme, changeTheme };
