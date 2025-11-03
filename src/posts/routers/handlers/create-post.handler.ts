import { PostInputDto } from '../../dto/post.input-dto';
import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../../blogs/repositories/blogs.repository';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model';

export const createPostHandler =
  async (req: Request<{}, {}, PostInputDto>, res: Response) => {
    const attributes = req.body;

    const blog = await blogsRepository.findById(attributes.blogId);

    if (!blog) {
      res.status(HttpStatus.NotFound)
        .send(createErrorMessages([{ field: 'blogId', message: 'No blog found' }]));
      return;
    }

    const newPost = {
      title: attributes.title,
      shortDescription: attributes.shortDescription,
      content: attributes.content,
      blogId: attributes.blogId,
    };

    const createdPost = await postsRepository.create(newPost);
    const blogViewModel = mapToPostViewModel(newPost);

    res.status(HttpStatus.Created).send(blogViewModel);
  };