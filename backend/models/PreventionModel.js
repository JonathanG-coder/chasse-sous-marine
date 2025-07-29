import mongoose from "mongoose"

const preventionSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    texte: {
        type: String,
        required: true,
    },
})

const Prevention = mongoose.model("Prevention", preventionSchema)
export default Prevention
