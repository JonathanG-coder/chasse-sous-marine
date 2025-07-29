import Category from "../models/Category.js"

// Creation de la categorie
export const createCategory = async (req, res) => {
    try {
        const category = new Category({nom: req.body.nom})
        await category.save()
        res.status(201).json(category)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}


// Récupérer toutes les catégories
export const getAllCategories = async (req, res) => {
    try {
        const category = await Category.find();
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// Récupérer une catégorie par son ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ error: "Catégorie non trouvée" });
        }

        res.json(category);
    } catch (error) {
        res.status(400).json({ error: "ID invalide ou erreur serveur" });
    }
};

// Modifier une categorie
export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updated = await Category.findByIdAndUpdate(
            categoryId,
            { nom: req.body.nom },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Catégorie non trouvée" });
        }

        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Supprimer une categorie

export const deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Catégorie non trouvée" });
        }

        res.status(200).json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
