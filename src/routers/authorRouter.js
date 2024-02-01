"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// hi
var s = 0;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthorController_1 = __importDefault(require("../controllers/AuthorController"));
const validationSchema_1 = require("../middlewares/validationSchema");
const router = express_1.default.Router();
router.post('/create', (0, validationSchema_1.ValidateSchema)(validationSchema_1.Schemas.author.create), AuthorController_1.default.createAuthor);
router.get('/get/:authorId', AuthorController_1.default.readAuthor);
router.get('/get/', AuthorController_1.default.readAll);
router.patch('/update/:authorId', (0, validationSchema_1.ValidateSchema)(validationSchema_1.Schemas.author.update), AuthorController_1.default.updateAuthor);
router.delete('/delete/:authorId', AuthorController_1.default.deleteAuthor);
exports.default = router;
