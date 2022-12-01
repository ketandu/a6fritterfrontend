import type {Request, Response} from 'express';
import express from 'express';
import UpvoteCollection from './collection';

const router = express.Router();

router.post(
    '/',

    async (req: Request, res: Response) => {
        const upvote = await UpvoteCollection.addUpvote(req.body.freetId, req.session.userId);
        res.status(200).json({
        message: 'You liked the freet.',
        upvote: upvote,
        });
    }
);

router.delete(
    '/',

    async (req: Request, res: Response) => {
        const response = await UpvoteCollection.deleteUpvote(req.body.freetId, req.session.userId);
        res.status(200).json({
        message: 'You unliked the freet.',
        });
    }
);

export {router as upvoteRouter};