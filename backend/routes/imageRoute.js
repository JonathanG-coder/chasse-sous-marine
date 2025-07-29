import express from 'express';
import { getAllImages, getImagesByCategorie, getImagesByEspece, createImage, deleteImage } from '../controllers/imageController.js';

const router = express.Router();

router.get('/', getAllImages);
router.get('/categorie/:categorieId', getImagesByCategorie);
router.get('/espece/:especeId', getImagesByEspece);
router.post('/', createImage);
router.delete('/:id', deleteImage);

export default router;
