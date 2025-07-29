import express from 'express';
import { 
  register, 
  login, 
  verifyEmail, 
  requestPasswordReset, 
  resetPassword, 
  resendVerificationEmail, 
  logout 
} from '../controllers/authController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Routes publiques
router.post('/register', register);
router.post('/login', authLimiter, login);
router.get('/verify/:token', verifyEmail);
router.post('/password-reset-request', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);
router.post('/resend-verification', resendVerificationEmail);
router.post('/logout', logout);

// Routes protégées
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

router.get('/user-profile', protect, (req, res) => {
  res.json({ message: `Bienvenue ${req.user.name}` });
});

router.get('/admin-panel', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Bienvenue dans le panneau admin' });
});

router.get('/moderator-section', protect, authorize('moderator', 'admin'), (req, res) => {
  res.json({ message: 'Bienvenue dans la section modérateur' });
});

export default router;
