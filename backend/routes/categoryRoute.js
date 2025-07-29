import express from 'express'
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory  } from '../controllers/categoryController.js';
import { isAdmin } from '../middleware/isAdmin.js';


const router = express.Router();

router.post('/category',isAdmin,  createCategory);
router.get('/category', getAllCategories);
router.get('/category/:id', getCategoryById);
router.put('/category/:id', isAdmin, updateCategory);
router.delete('/category/:id', isAdmin, deleteCategory);

export default router;