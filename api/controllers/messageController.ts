import { Request, Response, NextFunction } from 'express';
import messageModel from "../models/messageModel"; // Assuming you have a TypeScript model for Message

interface IMessageRequestBody {
    from: string;
    to: string;
    message: string;
}

interface IProjectMessage {
    fromSelf: boolean;
    message: string;
}

export const addMessage = async (req: Request<any, any, IMessageRequestBody>, res: Response, next: NextFunction) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });
        if (data) return res.json({ message: 'message added successfully' });
        return res.json({ message: 'failed to add message' });
    } catch (error) {
        next(error);
    }
};

export const getAllMessage = async (req: Request<any, any, { from: string; to: string }>, res: Response<IProjectMessage[]>, next: NextFunction) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            },
        })
        .sort({ updatedAt: 1 });
        const projectMessages: IProjectMessage[] = messages.map((msg:any) => ({
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
        }));
        res.json(projectMessages);
    } catch (error) {
        next(error);
    }
};
