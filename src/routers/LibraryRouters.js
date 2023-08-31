"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LibraryController_1 = __importDefault(require("../controllers/LibraryController"));
const validationSchema_1 = require("../middlewares/validationSchema");
const router = express_1.default.Router();
router.post('/create', (0, validationSchema_1.ValidateSchema)(validationSchema_1.Schemas.library.create), LibraryController_1.default.createLibrary);
router.patch('/addBook/:libraryId', LibraryController_1.default.addBookToLibrary);
router.patch('/update/:libraryId', (0, validationSchema_1.ValidateSchema)(validationSchema_1.Schemas.library.update), LibraryController_1.default.updateLibrary);
router.get('/get', LibraryController_1.default.readAllLibraries);
router.get('/get/:libraryId', LibraryController_1.default.readLibrary);
router.delete('/delete/:libraryId', LibraryController_1.default.deleteLibrary);
exports.default = router;
