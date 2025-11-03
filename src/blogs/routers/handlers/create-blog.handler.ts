import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { BlogInputDto } from '../../dto/blog.input-dto';


export const createBlogHandler = async (req: Request<{}, {}, BlogInputDto>, res: Response) => {
  const attributes = req.body;

  const newBlog = {
    name: attributes.name,
    description: attributes.description,
    websiteUrl: attributes.websiteUrl,
    createdAt: new Date(),
    isMembership: true,
  };

  await blogsRepository.create(newBlog);
  res.status(HttpStatus.Created).send(newBlog);
};