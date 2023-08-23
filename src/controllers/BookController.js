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
exports.deleteBook = exports.updateBook = exports.readAll = exports.readBook = exports.createBook = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BookModel_1 = __importDefault(require("../models/BookModel"));
const logging_1 = __importDefault(require("../library/logging"));
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author } = req.body;
    const book = new BookModel_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title,
        author
    });
    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((error) => {
        res.status(500).json({ error });
        logging_1.default.warn(error);
    });
});
exports.createBook = createBook;
const readBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    return BookModel_1.default.findById(bookId)
        .populate('author')
        .select('-__v')
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Book Not Found' })))
        .catch((error) => res.status(404).json({ message: 'Book Not Found' }));
});
exports.readBook = readBook;
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return BookModel_1.default.find()
        .populate('author')
        .select('-__v')
        .then((books) => res.status(200).json({ books }))
        .catch((error) => res.status(500).json({ error }));
});
exports.readAll = readAll;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    return BookModel_1.default.findById(bookId).then((book) => {
        if (book) {
            book.set(req.body);
            return book
                .save()
                .then((book) => res.status(200).json({ book }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Book Not Found' });
        }
    });
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    return BookModel_1.default.findByIdAndDelete(bookId).then((book) => {
        book ? res.status(201).json({ message: 'Deleted' }) : res.sendStatus(404).json({ message: 'Book Not Found To Delete' });
    });
});
exports.deleteBook = deleteBook;
exports.default = { createBook: exports.createBook, readBook: exports.readBook, readAll: exports.readAll, deleteBook: exports.deleteBook, updateBook: exports.updateBook };
