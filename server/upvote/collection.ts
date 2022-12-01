import type {HydratedDocument, Types} from 'mongoose';
import type {Upvote} from './model';
import UpvoteModel from './model';
import FreetCollection from '../freet/collection';

class UpvoteCollection {
    static async addUpvote(freetId: Types.ObjectId | string, voterId: Types.ObjectId | string): Promise<HydratedDocument<Upvote>> {
        const upvote = new UpvoteModel({
            freetId,
            voterId
        });
        await upvote.save();
        //const freet = FreetCollection.findOne(freetId);
        return upvote;
    }

    static async deleteUpvote(freetId: Types.ObjectId | string, voterId: Types.ObjectId | string): Promise<boolean> {
        const upvote = await UpvoteModel.deleteOne({freetId: freetId, voterId: voterId});
        return upvote !== null;
    }


}

export default UpvoteCollection;