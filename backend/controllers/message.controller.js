import Converstaion from "../models/conversation.models.js";
import Message from "../models/message.models.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage=async(req,res)=>{
    try{
       const {message}=req.body;
       const{id:receiverId}=req.params;
       const senderId=req.user._id;
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
        message,
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
/*

import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { storage } from "../firebase.js"; // Import Firebase storage setup
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// Function to upload file to Firebase
const uploadFileToFirebase = async (file) => {
  const fileExtension = file.originalname.split(".").pop(); // Get file extension
  const fileName = `${uuidv4()}.${fileExtension}`; // Generate unique file name
  const storageRef = ref(storage, `uploads/${fileName}`);

  // Upload file to Firebase Storage
  await uploadBytes(storageRef, file.buffer);

  // Get the file's URL after upload
  const fileUrl = await getDownloadURL(storageRef);
  return fileUrl;
};

// Send Message Controller
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Handle file upload (if any)
    let fileUrl = null;
    if (req.file) {
      fileUrl = await uploadFileToFirebase(req.file); // Upload file and get URL
    }

    // Create new message with file URL (if file exists)
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      fileUrl, // Save file URL in the message
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Save conversation and message
    await Promise.all([conversation.save(), newMessage.save()]);

    // Emit message via socket (with file URL if applicable)
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Messages Controller
export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // Find conversation between sender and receiver
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    // Return messages, including file URLs if applicable
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
*/