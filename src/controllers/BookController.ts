import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/BookModel';
import Logging from '../library/logging';
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, author, genre } = req.body;
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author,
        genre
    });
    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((error) => {
            res.status(500).json({ error });
            Logging.warn(error);
        });
};
export const readBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findById(bookId)
        .populate('author')
        .select('-__v')
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Book Not Found' })))
        .catch((error) => res.status(404).json({ message: 'Book Not Found' }));
};
export const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return Book.find()
        .populate('author')
        .select('-__v')
        .then((books) => res.status(200).json({ books }))
        .catch((error) => res.status(500).json({ error }));
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findById(bookId).then((book) => {
        if (book) {
            book.set(req.body);
            return book
                .save()
                .then((book) => res.status(200).json({ book }))
                .catch((error) => res.status(500).json({ error }));
        } else {
            res.status(404).json({ message: 'Book Not Found' });
        }
    });
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findByIdAndDelete(bookId).then((book) => {
        book ? res.status(201).json({ message: 'Deleted' }) : res.sendStatus(404).json({ message: 'Book Not Found To Delete' });
    });
};
export default { createBook, readBook, readAll, deleteBook, updateBook };
