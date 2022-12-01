import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

export type Upvote = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    freetId: Types.ObjectId;
    voterId: Types.ObjectId;
};

const UpvoteSchema = new Schema<Upvote>({
    freetId: {
        // Use Types.ObjectId outside of the schema
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Freet'
      },
      voterId: {
        // Use Types.ObjectId outside of the schema
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
})

const UpvoteModel = model<Upvote>('Upvote', UpvoteSchema);
export default UpvoteModel;