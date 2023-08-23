"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookController_1 = __importDefault(require("../controllers/BookController"));
const validationSchema_1 = require("../middlewares/validationSchema");
const router = express_1.default.Router();
router.post('/create', (0, validationSchema_1.ValidateSchema)(validationSchema_1.Schemas.book.create), BookController_1.default.createBook);
router.get('/get/:bookId', BookController_1.default.readBook);
router.get('/get', BookController_1.default.readAll);
router.patch('/update/:bookId', (0, validationSchema_1.ValidateSchema)(validationSchema_1.Schemas.book.update), BookController_1.default.updateBook);
router.delete('/delete/:bookId', BookController_1.default.deleteBook);
exports.default = router;
