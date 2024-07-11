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
const server = http.Server(app);
const io = initSocket(server);



app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["content-type", "Authorization"],
    credentials: true,
  })
);



mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('connected to database successfully');
  server.listen(process.env.PORT, () => {
    console.log(`server is running on the port ${process.env.PORT}`);

  });
})
  .catch((error) => {
    console.log(`something went wrong while connecting to databse : ${error}`);
  });

app.use('/admin', adminRoutes);
app.use('/employee', employeeRoutes);
app.use('/client', clientRoutes);
app.use('/sheet', sheetRoutes);
app.use('/contact', contactRoutes);

export const handler = serverless(app);