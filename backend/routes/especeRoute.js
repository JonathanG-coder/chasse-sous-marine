import express from 'express'
import { createEspece, getAllEspeces, getEspeceByID, updateEspece, deleteEspece } from '../controllers/especeController.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/especes', isAdmin, createEspece);
router.get('/especes', getAllEspeces);
router.get('/especes/:id', getEspeceByID);
router.put('/especes/:id',isAdmin,  updateEspece); 
router.delete('/especes/:id', isAdmin, deleteEspece);

export default router;