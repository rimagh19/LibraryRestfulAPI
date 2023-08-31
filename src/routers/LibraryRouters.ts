import express from 'express';
import controller from '../controllers/LibraryController';
import { ValidateSchema, Schemas } from '../middlewares/validationSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.library.create), controller.createLibrary);
router.patch('/addBook/:libraryId', controller.addBookToLibrary);
router.patch('/update/:libraryId', ValidateSchema(Schemas.library.update), controller.updateLibrary);
router.get('/get', controller.readAllLibraries);
router.get('/get/:libraryId', controller.readLibrary);
router.delete('/delete/:libraryId', controller.deleteLibrary);

export default router;
