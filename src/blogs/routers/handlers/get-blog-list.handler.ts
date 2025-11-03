import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogs.repository';
import { mapToBlogListViewModel } from '../mappers/map-to-blog-list-view-model';

export const getBlogListHandler = async (req: Request, res: Response) => {
  const blogs = await blogsRepository.findAll();
  const blogViewModels = mapToBlogListViewModel(blogs);

  res.send(blogViewModels);
};
