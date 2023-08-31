"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLibrary = exports.readLibrary = exports.readAllLibraries = exports.addBookToLibrary = exports.updateLibrary = exports.createLibrary = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LibraryModel_1 = __importDefault(require("../models/LibraryModel"));
const logging_1 = __importDefault(require("../library/logging"));
const createLibrary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, books, location } = req.body;
    const library = new LibraryModel_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        books,
        location
    });
    return library
        .save()
        .then((library) => res.status(201).json({ library }))
        .catch((error) => {
        res.status(500).json({ error });
        logging_1.default.warn(error);
    });
});
exports.createLibrary = createLibrary;
const updateLibrary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const libraryId = req.params.libraryId;
    return LibraryModel_1.default.findById(libraryId).then((library) => {
        if (library) {
            library.set(req.body);
            return library
                .save()
                .then((library) => res.status(201).json({ library }))
                .catch((error) => {
                res.status(500).json({ error });
                logging_1.default.warn(error);
            });
        }
        else {
            res.status(404).json({ message: 'Library Not Found' });
        }
    });
});
exports.updateLibrary = updateLibrary;
const addBookToLibrary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const libraryId = req.params.libraryId;
    const { booksToAdd } = req.body;
    try {
        const libraryToUpdate = yield LibraryModel_1.default.findById(libraryId);
        if (libraryToUpdate) {
            return LibraryModel_1.default.updateOne({ _id: libraryId }, { $push: { books: { $each: booksToAdd } } })
                .then((library) => res.status(201).json({ library }))
                .catch((error) => {
                res.status(500).json({ error });
                logging_1.default.warn(error);
            });
        }
        else {
            return res.status(404).json({ message: 'Library Not Found' });
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.addBookToLibrary = addBookToLibrary;
const readAllLibraries = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return LibraryModel_1.default.find()
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
});
exports.readAllLibraries = readAllLibraries;
const readLibrary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const libraryId = req.params.libraryId;
    return LibraryModel_1.default.findById(libraryId)
        .populate('books.author')
        .populate('books')
        .then((library) => (library ? res.status(200).json({ library }) : res.status(404).json({ message: 'Library Not Found' })))
        .catch((error) => res.status(404).json({ message: 'Book Not Found' }));
});
exports.readLibrary = readLibrary;
const deleteLibrary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const libraryId = req.params.libraryId;
    return LibraryModel_1.default.findByIdAndDelete(libraryId).then((Library) => {
        Library ? res.status(201).json({ message: 'Deleted' }) : res.sendStatus(404).json({ message: 'Library Not Found To Delete' });
    });
});
exports.deleteLibrary = deleteLibrary;
exports.default = { createLibrary: exports.createLibrary, addBookToLibrary: exports.addBookToLibrary, updateLibrary: exports.updateLibrary, readAllLibraries: exports.readAllLibraries, readLibrary: exports.readLibrary, deleteLibrary: exports.deleteLibrary };
