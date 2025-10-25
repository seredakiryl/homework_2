import { body } from 'express-validator';

const titleValidation = body('title')
  .isString()
  .withMessage('title should be string')
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage('Length of title is not correct');


const shortDescriptionValidation = body('shortDescription')
  .isString()
  .withMessage('shortDescription should be string')
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage('Length of shortDescription is not correct');

const contentValidation = body('content')
  .isString()
  .withMessage('content should be string')
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage('Length of content is not correct');

const blogIdValidation = body('blogId')
  .isString()
  .withMessage('blogId should be string')
  .trim()
  .isLength({ min: 1 })
  .withMessage('Length of blogId is not correct');


export const postCreateInputValidation = [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation];

export const postUpdateInputValidation = [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation];
