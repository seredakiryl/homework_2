import { param } from 'express-validator';

export const idValidation = param('id')
  .exists()
  .withMessage('ID is required')
  .isString()
  .withMessage('ID must be a string')
  .isMongoId()
  .withMessage('Неверный формат ObjectId');

export const blockIdValidation = param('blogId')
  .exists()
  .withMessage('blockId is required')
  .isString()
  .withMessage('blockId must be a string')
  .isMongoId()
  .withMessage('Неверный формат ObjectId');
