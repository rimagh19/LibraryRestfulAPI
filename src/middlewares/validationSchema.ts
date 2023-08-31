import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Logging from '../library/logging';
import { IAuthor } from '../models/AuthorModel';
import { IBookModel } from '../models/BookModel';
import { ILibrary } from '../models/LibraryModel';

export const ValidateSchema = (Schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            return res.status(400).json({ error });
        }
    };
};

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required()
        })
    },
    book: {
        create: Joi.object<IBookModel>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required(),
            genre: Joi.string().required()
        }),
        update: Joi.object<IBookModel>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required(),
            genre: Joi.string().required()
        })
    },
    library: {
        create: Joi.object<ILibrary>({
            name: Joi.string().required(),
            books: Joi.array().items(
                Joi.string()
                    .regex(/^[0-9a-fA-F]{24}$/)
                    .required()
            ),
            location: Joi.string().required()
        }),
        update: Joi.object<ILibrary>({
            name: Joi.string().required(),
            books: Joi.array().items(
                Joi.string()
                    .regex(/^[0-9a-fA-F]{24}$/)
                    .required()
            ),
            location: Joi.string().required()
        })
    }
};
