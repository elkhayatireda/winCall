
import Sheet from '../models/sheet.model.js';

// Function to change the employee of a sheet
export const changeEmployee = async (req, res) => {
    const { sheetId, newEmployeeId } = req.body;

    try {
        // Find the sheet by ID and update the Employee_id field
        const updatedSheet = await Sheet.findByIdAndUpdate(
            sheetId,
            { Employee_id: newEmployeeId },
            { new: true, runValidators: true }
        );

        if (!updatedSheet) {
            return res.status(404).json({ message: 'Sheet not found' });
        }

        // Respond with the updated sheet
        res.status(200).json(updatedSheet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function to change the employee for multiple sheets
export const changeEmployeeForSheets = async (req, res) => {
    const { currentEmployeeId, newEmployeeId } = req.body;

    try {
        // Find and update all sheets with the current Employee_id to the new Employee_id
        const updatedSheets = await Sheet.updateMany(
            { Employee_id: currentEmployeeId },
            { Employee_id: newEmployeeId }
        );

        if (updatedSheets.nModified === 0) {
            return res.status(404).json({ message: 'No sheets found with the specified Employee_id' });
        }

        // Respond with the number of sheets updated
        res.status(200).json({ message: `${updatedSheets.nModified} sheets updated successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function to get all sheets for a specific employee
export const getAllSheetsForEmployee = async (req, res) => {
    const  {employeeId}  = req.query;
    try {
        const sheets = await Sheet.find({ Employee_id: employeeId });
        res.status(200).json(sheets.map(sheet => {
            const formattedDate = new Date(sheet.lastorderDate).toISOString().replace('T', ' ').substring(0, 16).replace(/-/g, '/');
            return {
              ...sheet.toObject(),
              lastorderDate: formattedDate,
            };
          }));
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function to get all sheets
export const getAllSheets = async (req, res) => {
    try {
        const sheets = await Sheet.find();
        res.status(200).json(sheets.map(sheet => {
            const formattedDate = new Date(sheet.lastorderDate).toISOString().replace('T', ' ').substring(0, 16).replace(/-/g, '/');
            return {
              ...sheet.toObject(),
              lastorderDate: formattedDate,
            };
          }));
          
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Function to delete a sheet for a specific client
export const deleteSheetForClient = async (req, res) => {
    const { userId } = req.body;
    try {
        const result = await Sheet.deleteMany({ User_id: userId });
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function to delete a sheet for a specific client
export const deleteSheet = async (req, res) => {
    const { sheetId } = req.body;
    try {
        const result = await Sheet.findByIdAndDelete(sheetId);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function to delete a sheet for a specific client
export const viewSheet = async (req, res) => {
    const { sheetId } = req.body;
    try {
        const sheet = await Sheet.findById(sheetId);
        sheet.newOrder = false;
        sheet.save();
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};