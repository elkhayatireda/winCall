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




async function checkAndUpdateSheets() {
  try {
      const sheets = await Sheet.find();

      for (const sheet of sheets) {
          const auth = await initializeAuth(clientEmail, privateKey);
          const rows = await readSheet(auth, sheet.sheetId, 'orders!A1:Z1000');

          if (rows.length) {
            const lastRowIndex = rows.length - 1; 

            const orderDate = new Date(rows[lastRowIndex][0]); 
            console.log(sheet.lastorderDate)
            console.log(orderDate)
            const io = getSocket();
            if (orderDate > sheet.lastorderDate) {
              console.log(`New orders found for sheet ${sheet.sheetId}`);
              io.to(sheet.Employee_id.toString()).emit('notification', {
                message: "New order",
              });
              // Update the sheet in the database
              sheet.newOrder = true;
              sheet.lastorderDate = orderDate; // Update lastorderDate with the new order date
              await sheet.save();
            } else {
              console.log(`No new orders found for sheet ${sheet.sheetId}`);
            }
          }
      }
  } catch (error) {
      console.error('Error checking and updating sheets:', error);
  }
}

// Schedule the function to run every 3 minutes
cron.schedule('* * * * *', () => {
  checkAndUpdateSheets().catch(console.error);
});

// Set your credentials and spreadsheet ID
const clientEmail = 'bronigga@ethereal-argon-427022-r2.iam.gserviceaccount.com';
const privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3bDNr2FPrNen3\nOqBs1U2ZthRyxEbM2jNZt5cf818Yk2kEP2hE32MRUL++vJEoxzwvYWQ+D3352VqZ\nmO8F51hV4MWs6GD4Fs9n8jfgPXJ3utoxqbmV+Dcm0H9CQe6kye3O2Bj/OXHitJbj\n1DPpsUTdA4xxi7fnIohUD56YTmfLAMwKH4iqxcqH/MejftECUduaahVFbUhZOaUW\nAvUdgpfp2VWUagQyonCR0aQrzbE3j9sIpqXNFq/PEdffEqhxz6yDvhV0HSHzXKTy\nUu2UwEgUXbQRGYbwQ6nIRfjAuEw5dWJ2jwiYTqB+okVW6hv1WkkGnPKLNyP3c16T\nVMiKZiQFAgMBAAECggEAEmRfnZtCAu5TiQ5QYslasCSRVVa4ELd6ea8OkM4bBYBW\nge4Huww5R1W0/F+1IIUl1ExsPEraY3C3hHpQ0WM6uNXCjI16l7XV00L29l3C+h16\n3or5yH9srFAwyoiI8O4skdaaXxE4Cbb5AFxZXj//uzetX/9WD++nAuLUEMqf3ruI\nt5BWdAfcv4f2n26CGOGfOeCkcm/yCeDHlmmO5xFFJ0UCzqfY6hKYzpX1ayCyc1WE\nH1qDu/9nKCDEAVPFVVkslqbd9EjbY+hfzai/ZB9EI8h8FBa+wTBXLw2cJ138/T1i\nzEepBEww5H14HHGojTHiqsAej2sPf15SGIEo67wB0QKBgQDjqIh7BNLO5QzVxY9e\nYt60WZkBCaNaxV83NVtJBH8L3JVzPSg0BY2CMsESRU7eNkOffPqA5rnu5sTHsqqQ\njn6lwCwGHy4LHMjiija+F3UJvvsVUI025GHrSlFZeEtpf8tj6dDhY0OcPlj3IcFe\n+lHI2dDLa2e4qKe0b1zoR7Vj/QKBgQDOQeCt/yV1jcGjtKMDxw9EBbS50Dc4Zk0Z\nCw2Rszb/3eNeDxW7THrdTSxsYd1oFr6SCIB9i0IVAy8K1TZNGOt4Z9mjOQKAhAnT\nvafcUr9re1LZKfhdD3FNYxp1wbCswx2iUJOj9zsor/+Tv2dhOahXyqzl3w98WpY8\n2yFAE8BKqQKBgDZMSRkGQn1kNhZ6g0Jg1Hsxb4PG17ZbouUZDcexkdezadXNfVxD\nAshN8Ky56SCo0qIkfd7mqOwpEEANBg9qXRyNZDKllybBW8xkaMAX+isz6NDhoHy6\nJfynghWT0nC8MTeIWfCX61VFrZRr8aIElCMSiHEsEdYCK9WmRgOErufFAoGAJa2b\nIa3uZd8TdJhW/yWqAD8amKcUr1Tg2KZQQEGA1pTuKAyRZ7m86Bhk+ReXnqApB/xN\nnKGH3NbMDSqN1N+shD5UX6DWeCumr+uBcpobJcNNiyZDnJxpkj18Y+6SG704+KHH\nlrhfMjuUcKUSeYxS2FbJ5uQsrAbQUyWkmVQCWKECgYEAgVx0QL1roWLkP7TjtAJb\np7vdkWW3CROPVkGhQOLs2+pq3bfqXYgEqVvAwuxOeY01/tH+G+d8sRTWBqQyPOvJ\n69N/Qr7zzcfe6CYTo6MEEqhSPA//GFYtfr7nQqZT+ZA8eJEraA4VL/NRhqv0uDJg\nxtsL8W5Yn41hGn+304QRuUw=\n-----END PRIVATE KEY-----\n';
const spreadsheetId = '1fht5HqE86TapuNkMKGj9JSccUmEYukhYcqtaiWyxVvE';

// Function to initialize Google APIs client library and set up the authentication using service account credentials.
async function initializeAuth(clientEmail, privateKey) {
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
return auth;
}

// Function to read data from a specific sheet.
async function readSheet(auth, spreadsheetId, sheetName) {
const sheets = google.sheets({ version: 'v4', auth });
try {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: sheetName,
  });
  const rows = response.data.values;
  return rows;
} catch (error) {
  console.error(`Error reading data from sheet ${sheetName}:`, error);
  throw error;
}
}