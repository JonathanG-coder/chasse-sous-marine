import Espece from "../models/Espece.js";
import Category from "../models/Category.js"; 

// Crer une espece
export const createEspece = async (req, res) => {
    try {
        const {titre, content, category} = req.body;
        const espece = new Espece({titre, content, category})
        await espece.save()
        res.status(201).json(espece);
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Recuperer toutes les especes
export const getAllEspeces = async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {};

        if (category) {
            // Trouver la catégorie par son nom
            const foundCategory = await Category.findOne({ nom: category });
            if (!foundCategory) {
                return res.status(404).json({ error: "Catégorie non trouvée" });
            }
            filter.category = foundCategory._id;
        }

        // Trouver les espèces avec ou sans filtre
        const especes = await Espece.find(filter).populate("category", "nom");
        res.status(200).json(especes);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

// Recuperer une espece par son ID
export const getEspeceByID = async (req, res) => {
    try {
        const espece = await Espece.findById(req.params.id);

        if (!espece) {
            return res.status(404).json({ error: "Espece non trouvé" });
        }

        res.json(espece);
    } catch (error) {
        res.status(400).json({ error: "ID invalide ou erreur serveur" });
    }
};

// Modifier une espece
export const updateEspece = async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, content, category } = req.body;

        const updatedEspece = await Espece.findByIdAndUpdate(
            id,
            { titre, content, category },
            { new: true }
        );

        if (!updatedEspece) {
            return res.status(404).json({ error: "Espece non trouvé" });
        }

        res.status(200).json(updatedEspece);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer une espece
export const deleteEspece = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Espece.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Espece non trouvé" });
        }

        res.status(200).json({ message: "Espece supprimé avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
