import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogs.repository';

export const getBlogListHandler = async (req: Request, res: Response) => {
  const blogs = await blogsRepository.findAll();
  res.send(blogs);
};
