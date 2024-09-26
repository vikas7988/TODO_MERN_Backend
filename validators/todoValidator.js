import { body, validationResult } from 'express-validator';

export const addTodoValidation = [
    body('name').isString().notEmpty().withMessage('Name is required and must be a string'),
    body('description').isString().optional().withMessage('Description must be a string if provided'),
];

export const updateTodoValidation = [
    body('name').isString().optional().withMessage('Name must be a string if provided'),
    body('description').isString().optional().withMessage('Description must be a string if provided'),
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
