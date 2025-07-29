import mongoose from 'mongoose';



const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String },
  categorieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  especeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Espece' }, 
}, { timestamps: true });

export default mongoose.model('Image', imageSchema)
