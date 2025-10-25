import express, { Express, Request, Response } from 'express';

import { BLOGS_PATH, POSTS_PATH } from './core/paths/paths';
import { blogsRouter } from './blogs/routers/blogs.router';
import { postsRouter } from './posts/routers/posts.router';
import { db } from './db/in-memory.db';
import { HttpStatus } from './core/types/http-statuses';

export const setupApp = (app: Express) => {
  app.use(express.json());


  app.get('/', (req, res) => {
    res.status(HttpStatus.Ok).send('hello world!!!');
  });

  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);

  app.delete('/testing/all-data', (req: Request, res: Response) => {
      db.blogs = [];
      db.posts = [];
      res.status(HttpStatus.NoContent).send('All data is deleted');
    },
  );
  return app;
};
