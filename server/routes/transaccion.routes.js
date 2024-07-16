import { Router } from 'express';
import {
  createTransacciones,
  getTransacciones,
} from '../controllers/transacciones.controller.js';

const router = Router();

router.get('/api/transacciones', getTransacciones);
router.post('/api/transacciones', createTransacciones);

export default router;
