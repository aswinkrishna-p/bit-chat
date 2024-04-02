import express, { Router } from 'express';
import { Request, Response, NextFunction } from 'express'; // Importing Request, Response, and NextFunction individually
import { addMessage, getAllMessage } from "../controllers/messageController";

const messageRouter: Router = express.Router();

// Route for adding a message
messageRouter.post('/addmsg', async (req: Request, res: Response, next: NextFunction) => {
    await addMessage(req, res, next);
});

// Route for getting all messages
messageRouter.post('/getmsg', async (req: Request, res: Response, next: NextFunction) => {
    await getAllMessage(req, res, next);
});

export default messageRouter;
