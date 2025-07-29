import Prevention from "../models/PreventionModel.js";


// Crer une prevention
export const createPrevention = async (req, res) => {
    try {

        const {titre, texte} = req.body;
        const prevention = new Prevention({titre, texte})
        await prevention.save()
        res.status(201).json(prevention);
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Recuperer toutes les preventions

export const getAllPreventions = async (req, res) => {
    try {
        const preventions= await Prevention.find();
        res.status(200).json(preventions);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

// Recuperer une prevention par son ID
export const getPreventionByID = async (req, res) => {
    try {
        const prevention = await Prevention.findById(req.params.id);

        if (!prevention) {
            return res.status(404).json({ error: "prevention non trouvé" });
        }

        res.json(prevention);
    } catch (error) {
        res.status(400).json({ error: "ID invalide ou erreur serveur" });
    }
};

// Modifier une prevention
export const updatePrevention = async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, texte } = req.body;

        const updatedPrevention = await Prevention.findByIdAndUpdate(
            id,
            { titre, texte },
            { new: true }
        );

        if (!updatedPrevention) {
            return res.status(404).json({ error: "Prevention non trouvé" });
        }

        res.status(200).json(updatedPrevention);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer une prevention
export const deletePrevention = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Prevention.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Prevention non trouvé" });
        }

        res.status(200).json({ message: "Prevention supprimé avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};