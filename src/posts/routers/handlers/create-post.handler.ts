import { PostInputDto } from '../../dto/post.input-dto';
import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/utils/errors.handler';

export const createPostHandler = async (
  req: Request<{}, {}, PostInputDto>,
  res: Response,
) => {
  try {
    const createdPost = await postsService.create(req.body);
    const blogViewModel = mapToPostViewModel(createdPost);

    res.status(HttpStatus.Created).send(blogViewModel);
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
