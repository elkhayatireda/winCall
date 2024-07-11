import bcryptjs from "bcryptjs"; 
import jwt from "jsonwebtoken";
import Client from '../models/client.model.js';
import Sheet from '../models/sheet.model.js';
import Employee from '../models/employee.model.js';
import dotenv from 'dotenv';
dotenv.config();

// Function to add a new client
export const addNewClient = async (req, res) => {
    const { firstName, lastName, email, phone, password , sheetLink, sheetId, employeeId} = req.body;

    try {
        // Check if the client already exists by email or phone
        const existingClientByEmail = await Client.findOne({ email });
        if (existingClientByEmail) {
            return res.status(400).json({ message: 'Client with this email already exists' });
        }

        const existingClientByPhone = await Client.findOne({ phone });
        if (existingClientByPhone) {
            return res.status(400).json({ message: 'Client with this phone number already exists' });
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);
        // Create a new client
        const newClient = new Client({
            fullName: firstName + lastName,
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
        });

        // Save the new client to the database
        const savedClient = await newClient.save();

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(400).json({ message: 'employee not found' });
        }

        const newSheet = new Sheet({
          user_id: savedClient._id,
          Employee_id: employee._id,
          sheetUrl:sheetLink,
          sheetId,
          lastorderDate: new Date('1900-01-01T00:00:00Z'), // Set to January 1, 1900
          newOrder: false // Assuming default value, can be updated if needed
        });

        // Save the new sheet to the database
        const savedSheet = await newSheet.save();

        res.status(201).json({ message: 'client created successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Function to get all clients
export const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients.map(user => ({
            ...user.toObject(),
            createdAt: user.createdAt.toISOString().split('T')[0].replace(/-/g, '/'),
          })));
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch clients', error: error.message });
    }
};

// Function to delete a client by ID
export const deleteClientById = async (req, res) => {
  const { clientIds } = req.body; 
  try {
    for (const clientId of clientIds) {
        await Client.findByIdAndDelete(clientId);
    }
    res.status(200).json({ message: 'clients deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to update client', error: error.message });
  }
};

export const getClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id)
        .select('-password');
        if (!client) {
          return res.status(404).json({ message: 'Client not found' });
        }
        const sheet = await Sheet.findOne({user_id: client._id });
        if (!sheet) {
            return res.status(404).json({ message: 'Sheet not found' });
          }
        res.json({client,sheet});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};

export const updateClient = async (req, res) => {
    try {
        const { client, sheet } = req.body;
        const { firstName, lastName, email, phone } = client;
        const { sheetUrl, sheetId, employeeId } = sheet;
    
        // Validate required fields
        if (!firstName || !email || !phone || !sheetUrl || !sheetId || !employeeId) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        const updatedClient = await Client.findByIdAndUpdate(
          req.params.id,
          { firstName, lastName, email, phone, fullName: `${firstName} ${lastName}` },
          { new: true, runValidators: true }
        );
    
        if (!updatedClient) {
          return res.status(404).json({ message: 'Client not found' });
        }
    
        const updatedSheet = await Sheet.findOneAndUpdate(
          { user_id: req.params.id },
          { sheetUrl, sheetId, employeeId },
          { new: true, runValidators: true }
        );
    
        if (!updatedSheet) {
          return res.status(404).json({ message: 'Sheet not found' });
        }
    
        res.json({ message: 'Client and Sheet updated successfully', client: updatedClient, sheet: updatedSheet });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update client and sheet' });
      }
};

export const signin = async (request, response, next) => {
    const { email, password } = request.body;
    
    try {
        // Check if the Client exists
        const client = await Client.findOne({ email });
  
        if (!client) {
            return response.status(401).json({ message: "Incorrect credentials" });
        }
  
        // Compare passwords
        const isPasswordCorrect = await bcryptjs.compare(password, client.password);
  
        if (!isPasswordCorrect) {
            return response.status(401).json({ message: "Incorrect credentials" });
        }
  
        // Create a JWT token
        const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
  
        // Send token and client details in response
        response.status(200).json({ token });
    } catch (error) {
        console.error("Error:", error.message);
        return response.status(500).json({ message: "Internal server error" });
    }
  };