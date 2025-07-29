import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import deleteUserCron from "./middleware/deleteUser.js";
import auditDependencies from './middleware/auditDependencies.js'
import helmet from 'helmet';
import cors from 'cors'

// Faire import des routes
import categoryRoutes from "./routes/categoryRoute.js";
import especeRoutes from "./routes/especeRoute.js";
import userRoutes from "./routes/userRoute.js";
import preventionRoutes from "./routes/preventionRoute.js";
import imageRoutes from "./routes/imageRoute.js";


dotenv.config();
console.log("MONGO_URI utilisé :", process.env.MONGO_URI);

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// Démarre le cron
deleteUserCron.start();
auditDependencies.start()

// Autres routes
app.use('/', userRoutes);
app.use('/', categoryRoutes);
app.use('/', especeRoutes);
app.use('/', preventionRoutes);
app.use('/api/images', imageRoutes);

// Ajout des routes d'authentification avec un préfixe '/api'
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send('<h2>Bonjour du serveur</h2>');
});
const PORT = process.env.PORT || 3023;


const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
