import { body } from 'express-validator';

const nameValidation = body('name')
  .isString()
  .withMessage('name should be string')
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage('Length of name is not correct');


const descriptionValidation = body('description')
  .isString()
  .withMessage('description should be string')
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage('Length of description is not correct');

const websiteUrlValidation = body('websiteUrl')
  .isString()
  .withMessage('websiteUrl should be string')
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage('Length of websiteUrl is not correct')
  .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
  .withMessage('need valid pattern');

export const blogCreateInputValidation = [
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
];

export const blogUpdateInputValidation = [
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
];


