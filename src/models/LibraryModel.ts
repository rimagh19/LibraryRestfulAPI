import express from 'express';
import mongoose, { Document, Schema } from 'mongoose';

/** interface #1: user inputs */
export interface ILibrary {
    name: string;
    books: Array<string>;
    location: string;
}

/** interface #2: all data */
export interface ILibraryModel extends Document, ILibrary {}

/** Schema */
const LibrarySchema: Schema = new Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
        name: {
            type: String,
            required: true
        },
        books: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Book', // Reference to the Book schema,
                required: true
            }
        ],
        location: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

/** Export Schema */
export default mongoose.model<ILibrary>('Library', LibrarySchema);
