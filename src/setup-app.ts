import express, {Express} from 'express';
import {BLOGS_PATH, POSTS_PATH} from "./core/paths/paths";
import {blogsRouter} from "./blogs/routers/blogs.router";
import {postsRouter} from "./posts/routers/posts.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.status(200).send('hello world!!!');
    });

    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);
    return app;
};
