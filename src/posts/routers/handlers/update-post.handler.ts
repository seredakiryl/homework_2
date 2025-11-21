import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { PostInputDto } from '../../dto/post.input-dto';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/utils/errors.handler';

export const updatedPostHandler = async (
  req: Request<{ id: string }, {}, PostInputDto>,
  res: Response,
) => {
  try {
    const id = req.params.id;
    await postsService.update(id, req.body);

    res.sendStatus(HttpStatus.NoContent);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
