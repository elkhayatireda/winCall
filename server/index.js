import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRoutes from "./routes/admin.route.js";
import employeeRoutes from "./routes/employee.route.js";
import clientRoutes from "./routes/client.route.js";
import sheetRoutes from "./routes/sheet.route.js";
import contactRoutes from "./routes/contact.route.js";
import { google } from "googleapis";
import Sheet from './models/sheet.model.js';
import cron from "node-cron";
import { getSocket } from './services/socket.js';
import serverless from "serverless-http";
import http from 'http';
import { Server } from 'socket.io';
import { initSocket } from './services/socket.js';

const app = express();   
app.use(
  cors({
    origin: "https://win-call-client.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["content-type", "Authorization"],
    credentials: true,
  })
);
const server = http.Server(app);
const io = initSocket(server);
app.use(express.json());
  
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to database successfully');
  })
  .catch((error) => {
    console.error(`something went wrong while connecting to database: ${error}`);
  });

server.listen(process.env.PORT, (error) => {
  if (error) {
    console.error(`Error starting server: ${error}`);
  } else {
    console.log(`server is running on the port ${process.env.PORT}`);
  }
});

app.get("/", (req, res) => res.send("Express on Vercel"));
app.use('/api/admin', adminRoutes);
app.use('/employee', employeeRoutes);
app.use('/client', clientRoutes);
app.use('/contact', contactRoutes);
app.use('/sheet', sheetRoutes);


export default app ;