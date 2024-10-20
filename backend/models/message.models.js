import mongoose from "mongoose";
const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    fileUrl: {
        type: String, // URL of the uploaded file in Cloudinary
    },
    fileName: {
        type: String, // Original name of the uploaded file
    },
    fileType: {
        type: String, // MIME type (e.g., 'image/jpeg', 'application/pdf')
    },
    fileSize: {
        type: Number, // Size of the file (optional, but could be useful)
    },
},{timestamps:true});
const Message=mongoose.model("Message",messageSchema);
export default Message;
/*
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
    },
    fileUrl: { // URL of the uploaded file (e.g., Firebase Storage)
        type: String,
    },
    fileType: { // Type of the file (e.g., image, video, pdf, etc.)
        type: String,
    },
    fileName: { // Original file name
        type: String,
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;

*/