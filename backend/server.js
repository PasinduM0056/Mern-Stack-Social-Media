import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import packageRoutes from "./routes/packageRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import addRoutes from "./routes/addRoutes.js";
import caddRoutes from "./routes/caddRoutes.js"
import JobPost from  "./routes/JobPostRoute.js";
import canidateRoutes from './routes/candidatesRoutes.js';
import { v2 as cloudinary } from "cloudinary";
import { app, server } from "./socket/socket.js";



dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Middlewares
app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/products", productRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/adds", addRoutes);
app.use("/api/cadds", caddRoutes);
app.use("/api/jobpost", JobPost);
app.use("/api/candidates", canidateRoutes);

server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
