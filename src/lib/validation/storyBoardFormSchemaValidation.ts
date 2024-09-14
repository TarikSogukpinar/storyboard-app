import Joi from 'joi';

export const storyBoardFormSchemaValidation = Joi.object({
    title: Joi.string().min(5).required().messages({
        'string.empty': 'Title is required',
        'string.min': 'Title must be at least 5 characters',
    }),
    description: Joi.string().min(10).required().messages({
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 10 characters',
    }),
    status: Joi.string().valid('draft', 'published', 'archived').required(),
    tags: Joi.string().pattern(/^[a-zA-Z0-9, ]*$/).required().messages({
        'string.pattern.base': 'Tags should be a comma-separated list of alphanumeric characters',
    }),
});