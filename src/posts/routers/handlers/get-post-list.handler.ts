import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { mapToPostListViewModel } from '../mappers/map-to-post-list-view-model';

export const getPostListHandler = async (req: Request, res: Response) => {
  const posts = await postsRepository.findAll();

  const postsViewModels = mapToPostListViewModel(posts);
  res.send(postsViewModels);
};
