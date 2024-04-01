import mongoose from 'mongoose';

interface IMessage extends mongoose.Document {
    message: {
        text: string;
    };
    users: mongoose.Types.ObjectId[]; 
    sender: mongoose.Types.ObjectId; 
}

const MessageSchema = new mongoose.Schema<IMessage>({
    message: {
        text: { type: String, required: true },
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });


const Message = mongoose.model<IMessage>('Message', MessageSchema);
export default Message;
