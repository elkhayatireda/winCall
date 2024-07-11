import express from "express"; 
import { verifyTokenEmployee  } from "../controllers/verifyemployeetoken.controller.js";
import { verifyTokenAdmin  } from "../controllers/verifytokenadmin.controller.js";
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployeeById, deleteEmployeeById, signin, getEmployee } from '../controllers/employee.controller.js'; // Adjust path as per your project structure


const router = express.Router();

// Route to create a new employee
router.post('/',verifyTokenAdmin, createEmployee);

// Route to get all employees
router.get('/',verifyTokenAdmin, getAllEmployees);

router.get('/get-for-admin',verifyTokenAdmin, getEmployee);

router.get('/get',verifyTokenEmployee, getEmployee);

// Route to get an employee by ID
router.get('/:id',verifyTokenEmployee, getEmployeeById);

// Route to get an employee by ID
router.get('/admin/:id',verifyTokenAdmin, getEmployeeById);

// Route to update an employee by ID
router.put('/:id',verifyTokenEmployee, updateEmployeeById);

// Route to delete an employee by ID
router.delete('/',verifyTokenAdmin, deleteEmployeeById);

// Route to sign in an employee
router.post('/signin', signin);

export default router;
