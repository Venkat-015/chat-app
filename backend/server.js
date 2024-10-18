/*import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import admin from 'firebase-admin'; // Import Firebase Admin
import serviceAccount from './firebaseServiceAccountKey.json' assert {type:'json'}; // Import service account key (adjust path if needed)
import { getStorage } from 'firebase-admin/storage'; 
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
 storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Make sure this is in your .env file
});
console.log('Firebase Storage Bucket:', process.env.FIREBASE_STORAGE_BUCKET);

const storage = getStorage().bucket(process.env.FIREBASE_STORAGE_BUCKET);
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Start the server
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
*/

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app,server } from "./socket/socket.js";
//import admin from 'firebase-admin';
const PORT=process.env.PORT||5000;
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);
//app.get("/",(req,res)=>{
  //  res.send("Hello World!");
//});

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)});






/*import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app,server } from "./socket/socket.js";
import admin from 'firebase-admin';
import fs from 'fs';
const serviceAccount=JSON.parse(fs.readFileSync('./firebaseServiceAccountKey.json',"utf-8"));
dotenv.config();
admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
  storageBucket:process.env.FIREBASE_STORAGE_BUCKET,
});
const bucket=admin.storage().bucket();
const PORT=process.env.PORT||5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);
//app.get("/",(req,res)=>{
  //  res.send("Hello World!");
//});

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)});
*/