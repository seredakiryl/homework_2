import express, { Express, Request, Response } from 'express';

import { BLOGS_PATH, POSTS_PATH } from './core/paths/paths';
import { blogsRouter } from './blogs/routers/blogs.router';
import { postsRouter } from './posts/routers/posts.router';
import { HttpStatus } from './core/types/http-statuses';
import { blogsRepository } from './blogs/repositories/blogs.repository';
import { postsRepository } from './posts/repositories/posts.repository';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(HttpStatus.Ok).send('hello world!!!');
  });

  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);

  app.delete('/testing/all-data', async (req: Request, res: Response) => {
      await blogsRepository.deleteBlogCollection();
      await postsRepository.deletePostCollection();
      res.status(HttpStatus.NoContent).send('All data is deleted');
    },
  );
  return app;
};
