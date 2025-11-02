import { PostInputDto } from '../../dto/post.input-dto';
import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../../blogs/repositories/blogs.repository';
import { createErrorMessages } from '../../../core/utils/error.utils';

export const createPostHandler =
  async (req: Request<{}, {}, PostInputDto>, res: Response) => {
    const attributes = req.body;
    console.log(req.body);
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
      blogName: blog.name,
    };

    await postsRepository.create(newPost);
    res.status(HttpStatus.Created).send(newPost);
  };