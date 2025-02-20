import Converstaion from "../models/conversation.models.js";
import Message from "../models/message.models.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const transformedFileUrl = (file) => {
  const downloadableTypes = [
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  
  if (downloadableTypes.includes(file.mimetype)) {
    return file.path.replace('/upload/', '/upload/fl_attachment/');
  }

  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    return file.path;
  }

  return file.path;
};

export const sendMessage=async(req,res)=>{
    try{
       const {message}=req.body;
       const{id:receiverId}=req.params;
       if (!req.user) {
        return res.status(401).json({ error: "Unauthorized - User not authenticated" });
    }
       const senderId = req.user._id;
    
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
        });
       }
       const newMessage=new Message({
        senderId,
        receiverId,
        message: message?.trim() || req.file?.originalname,

        ...fileData,
       });      
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


