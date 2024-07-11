import { verifyTokenAdmin  } from "../controllers/verifytokenadmin.controller.js";
import express from 'express';
import { changeEmployee, changeEmployeeForSheets, getAllSheetsForEmployee, getAllSheets, deleteSheetForClient, deleteSheet, viewSheet } from '../controllers/sheet.controller.js'; 
import { verifyTokenEmployee  } from "../controllers/verifyemployeetoken.controller.js";

const router = express.Router();

// Route to change employee of a sheet
router.put('/sheet/change-employee',verifyTokenAdmin, changeEmployee);

// Route to change employee for multiple sheets
router.put('/sheets/change-employee',verifyTokenAdmin, changeEmployeeForSheets);

router.post('/view',verifyTokenEmployee, viewSheet);

// Route to get all sheets for a specific employee
router.get('/employee',verifyTokenEmployee, getAllSheetsForEmployee);

// Route to get all sheets
router.get('/get-all',verifyTokenAdmin, getAllSheets);

// Route to delete sheets for a specific client
router.delete('/sheets/client',verifyTokenAdmin, deleteSheetForClient);

// Route to delete a specific sheet
router.delete('/sheet',verifyTokenAdmin, deleteSheet);

export default router;
