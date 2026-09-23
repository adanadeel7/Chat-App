import mongoose from "mongoose";

interface messageInterface{
    senderId : mongoose.Schema.Types.ObjectId,
    receiverId:mongoose.Schema.Types.ObjectId,
    text : string, 
    image : string, 
    video : string,
}

const messageSchema = new mongoose.Schema<messageInterface>({
      senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },


},{
    timestamps : true
})


export const Message = mongoose.model<messageInterface>("Message", messageSchema);

