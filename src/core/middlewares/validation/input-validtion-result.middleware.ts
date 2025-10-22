import {FieldValidationError, ValidationError, validationResult,} from 'express-validator';
import {NextFunction, Request, Response} from 'express';
import {HttpStatus} from '../../types/http-statuses';
import {ValidationErrorDto} from "../../types/validationError.dto";
import {ValidationErrorType} from "../../types/validationError";

export const createErrorMessages = (
    errors: ValidationErrorType[],
): ValidationErrorDto => {
    return {errorMessages: errors};
};

const formatErrors = (error: ValidationError): ValidationErrorType => {
    const expressError = error as unknown as FieldValidationError;

    return {
        field: expressError.path,
        message: expressError.msg,
    };
};

export const inputValidationResultMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req)
        .formatWith(formatErrors)
        .array({onlyFirstError: true});

    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).json({errorMessages: errors});
        return;
    }

    next();
};
