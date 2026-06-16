import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  editProductPrice,
  getProducts,
  getProductsWithPricesController,
  updateProductController,
  uploadPrices,
} from '../controllers/productsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getProducts);
router.get('/with-prices', getProductsWithPricesController);
router.post('/', createProductController);
router.put('/price/:product_price_id', editProductPrice);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProductController);
router.post('/upload-prices', uploadPrices);

export default router;
