import { verifyTokenAdmin  } from "../controllers/verifytokenadmin.controller.js";
import express from 'express';
import { addNewClient, getAllClients, deleteClientById, getClient, updateClient } from '../controllers/client.controller.js'; 

const router = express.Router();


router.post('/create',verifyTokenAdmin, addNewClient);

router.get('/get-all',verifyTokenAdmin, getAllClients);

router.get('/:id',verifyTokenAdmin, getClient);

router.put('/:id',verifyTokenAdmin, updateClient);

router.delete('/', deleteClientById);



export default router;