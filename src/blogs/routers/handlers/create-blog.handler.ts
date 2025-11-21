import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { BlogInputDto } from '../../dto/blog.input-dto';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/utils/errors.handler';

export const createBlogHandler = async (
  req: Request<{}, {}, BlogInputDto>,
  res: Response,
) => {
  try {
    const createdBlog = await blogsService.create(req.body);
    const blogViewModel = mapToBlogViewModel(createdBlog);
    res.status(HttpStatus.Created).send(blogViewModel);
  } catch (error) {
    errorsHandler(error, res);
  }
};
