import { Schema, model } from "mongoose";
import { IMessage } from "../../@types/message.model";

// Declare the Schema of the Mongo model
var chatSchema = new Schema<IMessage>({
    message:{
        type:String,
        required:true,
    },
    users:Array,
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
});

//Export the model
export const ChatModel = model<IMessage>('Chat', chatSchema);