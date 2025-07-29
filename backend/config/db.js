import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'ChasseSousMarine64'
});

    } catch (error) {
        console.error(`Erreur lors de la connexion à la base de données :`, error);
        process.exit(1);
    }
}
export default connectDB;

