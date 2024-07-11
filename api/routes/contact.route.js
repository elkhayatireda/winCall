import express from "express";
import { createContact, getAllContacts, deleteContacts } from '../controllers/contact.controller.js'; 
import { verifyTokenAdmin  } from "../controllers/verifytokenadmin.controller.js";

const router = express.Router();

// Route to sign in admin
router.post('/', createContact);
router.get('/',verifyTokenAdmin, getAllContacts);
router.delete('/',verifyTokenAdmin, deleteContacts);



export default router;
