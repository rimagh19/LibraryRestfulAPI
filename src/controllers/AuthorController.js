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
exports.updateAuthor = exports.deleteAuthor = exports.readAll = exports.readAuthor = exports.createAuthor = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AuthorModel_1 = __importDefault(require("../models/AuthorModel"));
const createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const author = new AuthorModel_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name
    });
    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((error) => res.status(500).json({ error }));
});
exports.createAuthor = createAuthor;
const readAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    return AuthorModel_1.default.findById(authorId)
        .then((author) => (author ? res.sendStatus(200).json({ author }) : res.sendStatus(404).json({ message: 'Author Not Found' })))
        .catch((error) => res.sendStatus(404).json({ message: 'Author Not Found' }));
});
exports.readAuthor = readAuthor;
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return AuthorModel_1.default.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((error) => res.sendStatus(500).json({ error }));
});
exports.readAll = readAll;
const deleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    return AuthorModel_1.default.findById(authorId).then((author) => {
        if (author) {
            author.set(req.body);
            return author
                .save()
                .then((author) => res.sendStatus(200).json({ author }))
                .catch((error) => res.sendStatus(500).json({ error }));
        }
        else {
            res.sendStatus(404).json({ message: 'Author Not Found' });
        }
    });
});
exports.deleteAuthor = deleteAuthor;
const updateAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    return AuthorModel_1.default.findByIdAndDelete(authorId).then((author) => {
        author ? res.status(201).json({ message: 'Deleted' }) : res.sendStatus(404).json({ message: 'Author Not Found To Delete' });
    });
});
exports.updateAuthor = updateAuthor;
exports.default = { createAuthor: exports.createAuthor, readAuthor: exports.readAuthor, readAll: exports.readAll, deleteAuthor: exports.deleteAuthor, updateAuthor: exports.updateAuthor };
