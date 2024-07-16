import { Router } from 'express';
import {
  createProducts,
  deleteProducts,
  getProductsCategory,
  getProducts,
  getUniqueProduct,
  updateProducts,
  Filters,
  filterProductsByName,
  getProductsByName,
  sumarProductQuantity,
  restarProductQuantity,
} from '../controllers/products.controller.js';
const router = Router();

router.get('/api/products/:cat/:collec/:sort', Filters);
router.get('/api/products/search/:texto', getProductsByName);
router.put('/api/products/sumar/:number/:id', sumarProductQuantity);
router.put('/api/products/restar/:number/:id', restarProductQuantity);
router.get('/api/products', getProducts);
router.get('/api/products/catalog/:name', filterProductsByName);
router.get('/api/products/category/:cat', getProductsCategory);
router.post('/api/products', createProducts);
router.put('/api/products/:id', updateProducts);

router.delete('/api/products/:id', deleteProducts);
router.get('/api/products/:id', getUniqueProduct);

export default router;
