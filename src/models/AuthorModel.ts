import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthor {
    name: string;
}

export interface IAuthorModel extends IAuthor, Document {}

const Authorschema: Schema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        versionKey: false // do not return versio key
    }
);

export default mongoose.model<IAuthorModel>('Author', Authorschema);
