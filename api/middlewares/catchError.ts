import { NextFunction, Request, Response } from 'express';

const catchError = (error: any, req: Request, res: Response, next: NextFunction): any => {

  res.status(500);
  res.render('error', { error });
};

export default catchError
