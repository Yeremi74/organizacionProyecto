import { Router } from 'express';
import {
  deleteUser,
  getUniqueUser,
  login,
  logout,
  profile,
  register,
  updateUser,
  users,
  verifyToken,
} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { roleRequired } from '../middlewares/ValidateRole.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile', authRequired, roleRequired, profile);
router.get('/users', authRequired, users);
router.get('/users/:id', authRequired, getUniqueUser);
router.put('/users/:id', authRequired, updateUser);
router.delete('/users/:id', deleteUser);

router.get('/verify', verifyToken);

export default router;
