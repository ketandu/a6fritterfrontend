import {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../freet/model';

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type CommunitySpace = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  spacename: string;
  creatorId: Types.ObjectId;
  dateCreated: Date;
};

export type CommunitySpaceContent = {
    _id: Types.ObjectId;
    spaceId: Types.ObjectId;
    freetId: Types.ObjectId;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const CommSchema = new Schema<CommunitySpace>({
  // The name of this Community Space
  spacename: {
    type: String,
    required: true
  },
  // The user that created this Community Space
  creatorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The date that this Community Space was created
  dateCreated: {
    type: Date,
    required: true
  }
});

const CommSpaceContent = new Schema<CommunitySpaceContent>({
  // The user that created this Community Space
  spaceId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The date that this Community Space was created
  freetId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

const CommModel = model<CommunitySpace>('CommunitySpace', CommSchema);
export const CommSpaceModel = model<CommunitySpaceContent>('CommunitySpaceContent', CommSpaceContent);
export default CommModel;