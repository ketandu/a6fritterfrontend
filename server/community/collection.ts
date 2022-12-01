import type {HydratedDocument, Types} from 'mongoose';
import CommModel, {CommunitySpace, CommunitySpaceContent, CommSpaceModel} from './model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to explore freets
 * stored in MongoDB, including adding, finding, updating, and deleting freets.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Freet> is the output of the FreetModel() constructor,
 * and contains all the information in Freet. https://mongoosejs.com/docs/typescript.html
 */
class CommCollection {
  /**
   * Add a freet to the collection
   *
   * @param {string} authorId - The id of the author of the freet
   * @param {string} spacename - The id of the content of the freet
   * @return {Promise<HydratedDocument<CommunitySpace>>} - The newly created freet
   */
  static async addOne(authorId: Types.ObjectId | string, spacename: string): Promise<HydratedDocument<CommunitySpace>> {
    const date = new Date();
    const communitySpace = new CommModel({
      creatorId: authorId,
      dateCreated: date,
      spacename: spacename
    });
    await communitySpace.save(); // Saves freet to MongoDB
    return communitySpace;
  }

  /**
   * Find a Community Space by commId
   *
   * @param {string} commId - The id of the Community Space to find
   * @return {Promise<HydratedDocument<CommunitySpace>> | Promise<null> } - The Community Space with the given commId, if any
   */
  static async findOneByCommunityId(commId: Types.ObjectId | string): Promise<HydratedDocument<CommunitySpace>> {
    return CommModel.findOne({_id: commId});
  }

  /**
   * Get all the freets in the community Space
   *@param{}
   * @return {Promise<HydratedDocument<freetId>[]>} - An array of all of the freets
   */
  static async findFreetsInCommunity(commId: Types.ObjectId | string): Promise<Array<HydratedDocument<CommunitySpaceContent>>> {
    // Retrieves freet ids from the space content table

    return CommSpaceModel.find({spaceId: commId});
  }

  /**
   * Get all the Community Spaces by given author
   *
   * @param {string} username - The username of author of the freets
   * @return {Promise<HydratedDocument<CommunitySpace>[]>} - An array of all of the freets
   */
  static async findAllByUsername(username: string): Promise<Array<HydratedDocument<CommunitySpace>>> {
    const author = await UserCollection.findOneByUsername(username);
    return CommModel.find({creatorId: author._id});
  }

  /**
   * Delete a community space with given commId.
   *
   * @param {string} commId - The commId of Community Space to delete
   * @return {Promise<Boolean>} - true if the Community Space has been deleted, false otherwise
   */
  static async deleteOne(commId: Types.ObjectId | string): Promise<boolean> {
    const comm = await CommModel.deleteOne({_id: commId});
    CommSpaceModel.deleteMany({spaceId: commId})
    return comm !== null;
  }

  /**
   * Delete all the community spaces by the given author
   *
   * @param {string} username - The username of creator of community space
   */
  static async deleteMany(username: string): Promise<void> {
    const author = await UserCollection.findOneByUsername(username);
    
    // get all the communities created by the given user
    const communitySpaces = await CommCollection.findAllByUsername(username);

    // remove content in all the communities
    for (let community of communitySpaces) {
      CommSpaceModel.deleteMany({spaceId: community._id});
    }

    // delete the communities
    await CommModel.deleteMany({creatorId: author._id});
  }

 /**
   * Add a freet to a community
   *
   * @param {string} commId - The id of the community to add the freet in
   * @param {string} freetId - The id of the freet
   * @return {Promise<HydratedDocument<Freet>>} - The newly created freet
   */
  static async addFreetToCommunity(commId: Types.ObjectId | string, freetId: Types.ObjectId | string): Promise<HydratedDocument<CommunitySpaceContent>> {
    const commSpaceContent = new CommSpaceModel({
      spaceId: commId,
      freetId: freetId
    });
    //const freet = FreetCollection.findOne(freetId)
    await commSpaceContent.save(); // Saves freet to MongoDB
    return commSpaceContent;
  }

  /**
   * Delete a freet from a community
   *
   * @param {string} commId - The id of the community to delete the freet from
   * @param {string} freetId - The id of freet to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */
     static async deleteFreetFromCommunity(freetId: Types.ObjectId | string, commId:   Types.ObjectId | string): Promise<boolean> {
      const freet = await CommSpaceModel.deleteOne({freetId: freetId, spaceId: commId});
      return freet !== null;
    }

}

export default CommCollection;