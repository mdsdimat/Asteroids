import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

import CookieToString from '../../src/helpers/CookieToString';

const auth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  res.locals.user = null;

  if (!req.cookies || !req.cookies.authCookie || !req.cookies.uuid) {
    next();
    return;
  }

  try {
    const { data } = await axios.get('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: {
        Cookie: CookieToString(req.cookies),
      },
      withCredentials: true,
    });

    res.locals.user = data;
  } catch (err) {
    console.log(err);
  }

  next();
};

export default auth;
