import express from 'express';
import controller from '../controllers/AuthorController';
import { isValidObjectId } from 'mongoose';
import { ValidateSchema, Schemas } from '../middlewares/validationSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.author.create), controller.createAuthor);
router.get('/get/:authorId', controller.readAuthor);
router.get('/get/', controller.readAll);
router.patch('/update/:authorId', ValidateSchema(Schemas.author.update), controller.updateAuthor);
router.delete('/delete/:authorId', controller.deleteAuthor);

export default router;
