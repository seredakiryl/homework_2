import { Router } from 'express';
import { getBlogListHandler } from './handlers/get-blog-list.handler';
import { getBlogHandler } from './handlers/get-blog.handler';
import { updatedBlogHandler } from './handlers/update-blog.handler';
import { deleteBlogHandler } from './handlers/delete-blog.handler';
import { createBlogHandler } from './handlers/create-blog.handler';
import { idValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import {
    blogCreateInputValidation,
    blogUpdateInputValidation,
} from '../validation/blog.input-dto.validation-middlewares';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validtion-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';

export const blogsRouter = Router({});


blogsRouter
  .get('', getBlogListHandler)
  .get('/:id', idValidation, inputValidationResultMiddleware, getBlogHandler)
  .post('', superAdminGuardMiddleware, blogCreateInputValidation, inputValidationResultMiddleware, createBlogHandler)
  .put('/:id', superAdminGuardMiddleware, idValidation, blogUpdateInputValidation, inputValidationResultMiddleware, updatedBlogHandler)
  .delete('/:id', superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, deleteBlogHandler);

