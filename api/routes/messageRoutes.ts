import express from 'express'
import { Route, Req, Res, Next } from "../types/serverPackageTypes";
import { addMessage, getAllMessage } from "../controllers/messageController";

const messageRouter: Route = express.Router();

// Route for adding a message
messageRouter.post('/addmsg', async (req: Req, res: Res, next: Next) => {
    await addMessage(req, res, next);
});

// Route for getting all messages
messageRouter.post('/getmsg', async (req: Req, res: Res, next: Next) => {
     await getAllMessage(req, res, next);
});

export default messageRouter;
