import { Router } from 'express';
import { getPostListHandler } from './handlers/get-post-list.handler';
import { idValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { createPostHandler } from './handlers/create-post.handler';
import { getPostHandler } from './handlers/get-post.handler';
import { updatedPostHandler } from './handlers/update-post.handler';
import { deletePostHandler } from './handlers/delete-post.handler';
import {
    postCreateInputValidation,
    postUpdateInputValidation,
} from '../validation/post.input-dto.validation-middlewares';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validtion-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';

export const postsRouter = Router({});

postsRouter
  .get('', getPostListHandler)
  .get('/:id', idValidation, getPostHandler)
  .post('', superAdminGuardMiddleware, postCreateInputValidation, inputValidationResultMiddleware, createPostHandler)
  .put('/:id', superAdminGuardMiddleware, idValidation, updatedPostHandler)
  .delete('/:id', superAdminGuardMiddleware, idValidation, postUpdateInputValidation, inputValidationResultMiddleware, deletePostHandler);
