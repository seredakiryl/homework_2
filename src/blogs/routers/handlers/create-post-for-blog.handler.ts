import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { PostCreateInputDto } from '../../../posts/routers/input/post-create.input';
import { mapToPostViewModel } from '../../../posts/routers/mappers/map-to-post-view-model';
import { postsService } from '../../../posts/application/posts.service';
import { errorsHandler } from '../../../core/utils/errors.handler';

export const createPostForBlogHandler = async (
  req: Request<{ blogId: string }, {}, Omit<PostCreateInputDto, 'blogId'>>,
  res: Response,
) => {
  try {
    const createdPost = await postsService.create({
      ...req.body,
      blogId: req.params.blogId,
    });
    const postViewModel = mapToPostViewModel(createdPost);

    res.status(HttpStatus.Created).send(postViewModel);
  } catch (error) {
    errorsHandler(error, res);
  }
};
