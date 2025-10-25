import {param} from 'express-validator';

export const idValidation = param('id')
    .exists()
    .withMessage('ID is required')
    .isString()
    .withMessage('ID must be a string')
    .isLength({min: 1})
    .withMessage('ID must not be empty')
    .isNumeric()
    .withMessage('ID must be a numeric string');
