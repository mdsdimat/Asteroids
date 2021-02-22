import { NextFunction, Request, Response } from 'express';

const catchError = (error: any, req: Request, _res: Response, next: NextFunction): any => {

  console.error(error.stack);

  _res.status(500);
  _res.render('error', { error });
};

export default catchError
