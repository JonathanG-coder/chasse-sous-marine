import express from 'express';
import { createUser } from '../controllers/userController.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema } from '../validations/user.validation.js';


const router = express.Router();

router.post('/users', validate(createUserSchema), createUser);

export default router;
