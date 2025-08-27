import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import deleteUserCron from './middleware/deleteUser.js';
import auditDependencies from './middleware/auditDependencies.js';
import helmet from 'helmet';
import cors from 'cors';

// Import des routes
import categoryRoutes from './routes/categoryRoute.js';
import especeRoutes from './routes/especeRoute.js';
import userRoutes from './routes/userRoute.js';
import preventionRoutes from './routes/preventionRoute.js';
import imageRoutes from './routes/imageRoute.js';

dotenv.config();
console.log('MONGO_URI utilisé :', process.env.MONGO_URI);

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

//  CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,                  // frontend local (dev)
  'https://chasse-sous-marine.vercel.app' // frontend production
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`L'origine CORS ${origin} n'est pas autorisée.`));
    }
  },
  credentials: true,
}));

app.use(helmet());

// Lancement des CRON
deleteUserCron.start();
auditDependencies.start();

//  Routes principales
app.use('/', userRoutes);
app.use('/', categoryRoutes);
app.use('/', especeRoutes);
app.use('/', preventionRoutes);
app.use('/api/images', imageRoutes);

// Routes d'authentification
app.use('/api/auth', authRoutes);

// Route de test serveur
app.get('/', (req, res) => {
  res.send('<h2>Bonjour du serveur</h2>');
});

const PORT = process.env.PORT || 3023;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
