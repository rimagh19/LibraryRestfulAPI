import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/AuthorModel';

export const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    });
    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((error) => res.status(500).json({ error }));
};
export const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findById(authorId)
        .then((author) => (author ? res.sendStatus(200).json({ author }) : res.sendStatus(404).json({ message: 'Author Not Found' })))
        .catch((error) => res.sendStatus(404).json({ message: 'Author Not Found' }));
};
export const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return Author.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((error) => res.sendStatus(500).json({ error }));
};

export const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findById(authorId).then((author) => {
        if (author) {
            author.set(req.body);
            return author
                .save()
                .then((author) => res.sendStatus(200).json({ author }))
                .catch((error) => res.sendStatus(500).json({ error }));
        } else {
            res.sendStatus(404).json({ message: 'Author Not Found' });
        }
    });
};

export const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findByIdAndDelete(authorId).then((author) => {
        author ? res.status(201).json({ message: 'Deleted' }) : res.sendStatus(404).json({ message: 'Author Not Found To Delete' });
    });
};

export default { createAuthor, readAuthor, readAll, deleteAuthor, updateAuthor };
