import { Request, Response } from 'express';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/utils/errors.handler';

export const getBlogHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blog = await blogsService.findByIdOrFail(id);

    const blogViewModel = mapToBlogViewModel(blog);
    res.send(blogViewModel);
  } catch (error) {
    errorsHandler(error, res);
  }
};
