import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/utils/errors.handler';

export const deleteBlogHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await blogsService.delete(id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    errorsHandler(error, res);
  }
};
