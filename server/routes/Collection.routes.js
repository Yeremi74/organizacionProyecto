import { Router } from 'express';
import {
  createCollections,
  deleteCollections,
  getCollections,
  getUniqueCollection,
  updateCollections,
} from '../controllers/collections.controllers.js';

const router = Router();

router.get('/api/collections', getCollections);
router.post('/api/collections', createCollections);
router.put('/api/collections/:id', updateCollections);

router.delete('/api/collections/:id', deleteCollections);
router.get('/api/collections/:id', getUniqueCollection);
export default router;
