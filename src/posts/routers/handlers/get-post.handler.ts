import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model';


export const getPostHandler = async (req: Request, res: Response) => {

  const id = req.params.id;
  const post = await postsRepository.findById(id);

  if (!post) {
    res.status(HttpStatus.NotFound).send(createErrorMessages([{ field: 'id', message: 'No post found' }]));
    return;
  }

  const postViewModel = mapToPostViewModel(post);
  res.send(postViewModel);
};