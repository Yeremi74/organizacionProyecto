import { Router } from 'express';
import {
  createCategories,
  deleteCategories,
  getCategories,
  getUniqueCategory,
  updateCategories,
} from '../controllers/categories.controller.js';
const router = Router();

router.get('/api/category', getCategories);
router.post('/api/category', createCategories);
router.put('/api/category/:id', updateCategories);

router.delete('/api/category/:id', deleteCategories);
router.get('/api/category/:id', getUniqueCategory);
export default router;
