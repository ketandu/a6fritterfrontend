import type {Request, Response} from 'express';
import express from 'express';
import CommCollection from './collection';

const router = express.Router();


router.post(
    '/',

    async (req: Request, res: Response) => {
        const community = await CommCollection.addOne(req.session.userId, req.body.spacename);
        res.status(200).json({
        message: 'Your community was created successfully.',
        community: community,
        });
    }
);


router.delete(
    '/',

    async (req: Request, res: Response) => {
        const response = await CommCollection.deleteOne(req.body.commId);
        res.status(200).json({
        message: 'Your community was deleted successfully.',
        });
    }
);


router.post(
    '/content',
    
    async (req: Request, res: Response) => {
      const contModel = await CommCollection.addFreetToCommunity(req.body.commId, req.body.freetId);
      res.status(200).json({
        message: 'Your freet was added to community successfully.',
      });
    }
);

router.get(
    '/',

    async (req: Request, res: Response) => {
        const response = await CommCollection.findFreetsInCommunity(req.query.commId as string);
        res.status(200).json({
          message: 'Your community content was found.',
          content: response,
        });
      }

);

  export {router as communityRouter};