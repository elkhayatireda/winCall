import bcryptjs from "bcryptjs"; 
import jwt from "jsonwebtoken";
import Employee from '../models/employee.model.js'; 
import Sheet from '../models/sheet.model.js'; 
import dotenv from 'dotenv';
dotenv.config();

// Function to create a new employee
export const createEmployee = async (req, res) => {
    const {  firstName, lastName, email, phone, password } = req.body;

    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const employee = new Employee({ fullName: firstName + " " + lastName, firstName, lastName, email, phone, password: hashedPassword });
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create employee', error: error.message });
    }
};
export const getEmployee = async (req, res, next) => {
    try {
      const user = await Employee.findById(req.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: "employee not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching employee data:", error);
      res.status(500).json({ message: "Internal server error" });
    }   
  }; 
// Function to get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const sheetCounts = await Sheet.aggregate([
            {
                $group: {
                    _id: "$Employee_id",
                    sheetCount: { $sum: 1 }
                }
            }
        ]);

        // Create a map of sheet counts for easy lookup
        const sheetCountMap = sheetCounts.reduce((map, item) => {
            map[item._id.toString()] = item.sheetCount;
            return map;
        }, {});

        // Find all employees
        const employees = await Employee.find();

        // Map employee data to include sheet count
        const employeeData = employees.map(user => {
            const userObj = user.toObject();
            return {
                ...userObj,
                createdAt: user.createdAt.toISOString().split('T')[0].replace(/-/g, '/'),
                sheetCount: sheetCountMap[user._id.toString()] || 0
            };
        });

        res.status(200).json(employeeData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch employees', error: error.message });
    }
};

// Function to get an employee by ID
export const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: `Employee not found with ID ${id}` });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch employee', error: error.message });
    }
};

// Function to update an employee by ID
export const updateEmployeeById = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const employee = await Employee.findByIdAndUpdate(id, updateFields, { new: true });
        if (!employee) {
            return res.status(404).json({ message: `Employee not found with ID ${id}` });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update employee', error: error.message });
    }
};

// Function to delete an employee by IDs
export const deleteEmployeeById = async (req, res) => {
    const { employeeIds } = req.body; 
    try {
      for (const adminId of employeeIds) {
          await Employee.findByIdAndDelete(adminId);
      }
      res.status(200).json({ message: 'Admins deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update employee', error: error.message });
    }
};


export const signin = async (request, response, next) => {
  const { email, password } = request.body;
  
  try {
      // Check if the employee exists
      const employee = await Employee.findOne({ email });

      if (!employee) {
          return response.status(401).json({ message: "Incorrect credentials" });
      }

      // Compare passwords
      const isPasswordCorrect = await bcryptjs.compare(password, employee.password);

      if (!isPasswordCorrect) {
          return response.status(401).json({ message: "Incorrect credentials" });
      }

      // Create a JWT token
      const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '6h' });

      // Send token and employee details in response
      response.status(200).json({ token });
  } catch (error) {
      console.error("Error:", error.message);
      return response.status(500).json({ message: "Internal server error" });
  }
};