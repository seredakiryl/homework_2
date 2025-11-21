import { Request, Response } from 'express';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model';
import { errorsHandler } from '../../../core/utils/errors.handler';
import { postsService } from '../../application/posts.service';

export const getPostHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const post = await postsService.findByIdOrFail(id);

    const postViewModel = mapToPostViewModel(post);

    res.send(postViewModel);
  } catch (error) {
    errorsHandler(error, res);
  }
};
