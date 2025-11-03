import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogs.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model';


export const getBlogHandler = async (req: Request, res: Response) => {

  const id = req.params.id;
  const blog = await blogsRepository.findById(id);

  if (!blog) {
    res.status(HttpStatus.NotFound).send(createErrorMessages([{ field: 'id', message: 'No blog found' }]));
    return;
  }
  const blogViewModel = mapToBlogViewModel(blog);
  res.send(blogViewModel);
};