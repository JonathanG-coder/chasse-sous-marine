import mongoose from 'mongoose';

const especeSchema = new mongoose.Schema({
    titre : {
        type:String, required: true
    },
    content : String,

    category: { type : mongoose.Schema.Types.ObjectId, ref: "Category", required: true}
})

export default mongoose.model('Espece', especeSchema)
