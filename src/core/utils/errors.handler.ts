import { Response } from 'express';
import { HttpStatus } from '../types/http-statuses';
import { createErrorMessages } from '../middlewares/validation/input-validtion-result.middleware';
import { RepositoryNotFoundError } from './repository-not-found.error';

export function errorsHandler(error: any, res: Response): void {
  if (error instanceof RepositoryNotFoundError) {
    const httpStatus = HttpStatus.NotFound;

    res.status(httpStatus).send(
      createErrorMessages([
        {
          field: 'id',
          message: error.message,
        },
      ]),
    );

    return;
  }

  res.status(HttpStatus.InternalServerError);
  return;
}
