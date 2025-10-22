import {Router} from "express";
import {getBlogListHandler} from "./handlers/get-blog-list.handler";

export const blogsRouter = Router({});

blogsRouter.get('',getBlogListHandler)