import express from 'express';
import controller from '../controllers/BookController';
import { ValidateSchema, Schemas } from '../middlewares/validationSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.book.create), controller.createBook);
router.get('/get/:bookId', controller.readBook);
router.get('/get', controller.readAll);
router.patch('/update/:bookId', ValidateSchema(Schemas.book.update), controller.updateBook);
router.delete('/delete/:bookId', controller.deleteBook);

export default router;
