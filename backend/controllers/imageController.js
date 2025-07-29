import Image from '../models/Image.js';
import '../models/Category.js'; 


// Récupérer toutes les images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().populate("categorieId", "nom"); // ajoute le champ 'nom' depuis Categorie
    res.json(images);
  } catch (error) {
    console.error("Erreur lors de la récupération des images :", error);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer images par catégorie
export const getImagesByCategorie = async (req, res) => {
  try {
    const images = await Image.find({ categorieId: req.params.categorieId });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer images par espece
export const getImagesByEspece = async (req, res) => {
  try {
    const images = await Image.find({ especeId: req.params.especeId });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle image
export const createImage = async (req, res) => {
  const { url, description, categorieId, especeId } = req.body;

  try {
    const newImage = new Image({
      url,
      description,
      categorieId,
      especeId,
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une image par id
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image non trouvée' });
    }
    await image.remove();
    res.json({ message: 'Image supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};