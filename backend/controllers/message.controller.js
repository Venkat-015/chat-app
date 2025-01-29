import Converstaion from "../models/conversation.models.js";
import Message from "../models/message.models.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
//import { generateSignedUrl } from "../cloudinaryConfig.js";

export const transformedFileUrl = (file) => {
  // Apply the download transformation for all document and attachment types
  const downloadableTypes = ['application/x-pdf','application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

  if (downloadableTypes.includes(file.mimetype)) {
    // Apply Cloudinary download flag for these file types
    return file.path.replace('/upload/', '/upload/fl_attachment/');
  }

  return file.path;  // Return the original path for other file types
};

export const sendMessage=async(req,res)=>{
    try{
      //const fileUrl = req.file ? transformedFileUrl(req.file) : null;
       const {message}=req.body;
       const{id:receiverId}=req.params;
       const senderId=req.user._id;
       let fileData={};
       if(req.file){
        const fileUrl = transformedFileUrl(req.file);

        fileData = {
          fileUrl, // Cloudinary URL
          fileName: req.file.originalname, // Original file name
          fileType: req.file.mimetype, // MIME type
          fileSize: req.file.size, // File size (optional)
      };}
      let conversation= await Converstaion.findOne({
        participants:{$all:[senderId,receiverId]},
       });
       if(!conversation){
        conversation=await Converstaion.create({
        participants:[senderId,receiverId],    
        })
       }
       const newMessage=new Message({
        senderId,
        receiverId,
        message:message || req.file?.originalname || ' ',
        ...fileData,
       })

        

       if(newMessage){
        conversation.messages.push(newMessage._id);
       }
       await Promise.all([conversation.save(),newMessage.save()]);
       const receiverSocketId=getReceiverSocketId(receiverId);
       if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage);
        
       }


       res.status(201).json(newMessage);
    }
    catch(error){
        console.log("Error in sendMessage controller:",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};
export const getMessage=async(req,res)=>{
try{
    const {id:userToChatId}=req.params;
    const senderId=req.user._id;
    const conversation=await Converstaion.findOne({
        participants:{$all:[senderId,userToChatId]},
    }).populate("messages");
if(!conversation) return res.status(200).json([]);
const messages=conversation.messages;

    res.status(200).json(messages);
}
catch(error){
    console.log("Error in sendMessage controller:",error.message);
        res.status(500).json({error:"Internal Server Error"});
}
};


