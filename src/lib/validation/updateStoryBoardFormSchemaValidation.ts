import Joi from 'joi';

export const updateStoryBoardFormSchemaValidation = Joi.object({
    title: Joi.string().min(5).required().messages({
        'string.empty': 'Title is required',
        'string.min': 'Title must be at least 5 characters',
    }),
    description: Joi.string().min(10).required().messages({
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 10 characters',
    }),
});
