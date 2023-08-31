import express from 'express';
import mongoose, { Schema, Document } from 'mongoose';

/** Ibook: Tstructure of a book, a basic structure that represents the data for a book.
 */
export interface Ibook {
    title: string;
    author: string;
    genre: string;
}

/**
 IBookModel: represents the structure of a MongoDB document for a book. It includes properties defined in both the Ibook interface and the default properties provided by Mongoose's Document interface.
 */
export interface IBookModel extends Document, Ibook {}

/** the database structure */
const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
        genre: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

/**exports the Mongoose model for the 'Book' collection. It specifies that the model should implement the IBookModel interface and uses the BookSchema as the schema structure. */

export default mongoose.model<IBookModel>('Book', BookSchema);
