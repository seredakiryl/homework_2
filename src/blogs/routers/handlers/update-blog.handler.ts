import { BlogInputDto } from '../../dto/blog.input-dto';
import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/utils/errors.handler';

export const updatedBlogHandler = async (
  req: Request<{ id: string }, {}, BlogInputDto>,
  res: Response,
) => {
  try {
    const id = req.params.id;

    await blogsService.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
