import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Library from '../models/LibraryModel';
import Logging from '../library/logging';

export const createLibrary = async (req: Request, res: Response, next: NextFunction) => {
    const { name, books, location } = req.body;

    const library = new Library({
        _id: new mongoose.Types.ObjectId(),
        name,
        books,
        location
    });

    return library
        .save()
        .then((library) => res.status(201).json({ library }))
        .catch((error) => {
            res.status(500).json({ error });
            Logging.warn(error);
        });
};

export const updateLibrary = async (req: Request, res: Response, next: NextFunction) => {
    const libraryId = req.params.libraryId;

    return Library.findById(libraryId).then((library) => {
        if (library) {
            library.set(req.body);
            return library
                .save()
                .then((library) => res.status(201).json({ library }))
                .catch((error) => {
                    res.status(500).json({ error });
                    Logging.warn(error);
                });
        } else {
            res.status(404).json({ message: 'Library Not Found' });
        }
    });
};

export const addBookToLibrary = async (req: Request, res: Response, next: NextFunction) => {
    const libraryId = req.params.libraryId;
    const { booksToAdd } = req.body;
    try {
        const libraryToUpdate = await Library.findById(libraryId);
        if (libraryToUpdate) {
            return Library.updateOne({ _id: libraryId }, { $push: { books: { $each: booksToAdd } } })
                .then((library) => res.status(201).json({ library }))
                .catch((error) => {
                    res.status(500).json({ error });
                    Logging.warn(error);
                });
        } else {
            return res.status(404).json({ message: 'Library Not Found' });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const readAllLibraries = async (req: Request, res: Response, next: NextFunction) => {
    return Library.find()
        .populate({
            path: 'books',
            populate: {
                path: 'author',
                model: 'Author'
            }
        })
        .select('-__v')
        .then((libraries) => res.status(200).json({ libraries }))
        .catch((error) => res.status(500).json({ error }));
};

export const readLibrary = async (req: Request, res: Response, next: NextFunction) => {
    const libraryId = req.params.libraryId;
    return Library.findById(libraryId)
        .populate('books.author')
        .populate('books')
        .then((library) => (library ? res.status(200).json({ library }) : res.status(404).json({ message: 'Library Not Found' })))
        .catch((error) => res.status(404).json({ message: 'Book Not Found' }));
};

export const deleteLibrary = async (req: Request, res: Response, next: NextFunction) => {
    const libraryId = req.params.libraryId;
    return Library.findByIdAndDelete(libraryId).then((Library) => {
        Library ? res.status(201).json({ message: 'Deleted' }) : res.sendStatus(404).json({ message: 'Library Not Found To Delete' });
    });
};

export default { createLibrary, addBookToLibrary, updateLibrary, readAllLibraries, readLibrary, deleteLibrary };
