import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { BlogInputDto } from '../../dto/blog.input-dto';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model';


export const createBlogHandler = async (req: Request<{}, {}, BlogInputDto>, res: Response) => {
  const attributes = req.body;

  const newBlog = {
    name: attributes.name,
    description: attributes.description,
    websiteUrl: attributes.websiteUrl,
    isMembership: false,
    createdAt: new Date(),
  };

  const createdBlog = await blogsRepository.create(newBlog);
  const blogViewModel = mapToBlogViewModel(createdBlog);
  res.status(HttpStatus.Created).send(blogViewModel);
};