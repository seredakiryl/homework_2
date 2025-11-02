import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { postsRepository } from '../../repositories/posts.repository';


export const deletePostHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await postsRepository.findById(id);

  if (!post) {
    res.status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'No post found' }]));
  }
  await postsRepository.delete(id);
  res.sendStatus(HttpStatus.NoContent);
};