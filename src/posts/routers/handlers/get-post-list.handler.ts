import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';

export const getPostListHandler = async (req: Request, res: Response) => {
  const posts = await postsRepository.findAll();

  res.send(posts);
};
