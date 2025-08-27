import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    nom : {type : String, required : true},
    image : {type : String}
})

const Category = mongoose.model('Category', categorySchema);
export default Category