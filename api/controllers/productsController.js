import {
  createProduct,
  deleteProduct,
  getProductsWithPrices,
  listProducts,
  updateProduct,
  updateProductPrice,
} from '../models/productModel.js';
import { processPriceExcel } from '../services/priceExcelService.js';

export function getProducts(_req, res) {
  res.json(listProducts());
}

export function getProductsWithPricesController(_req, res) {
  res.json(getProductsWithPrices());
}

export function createProductController(req, res) {
  res.status(201).json(createProduct(req.body));
}

export function updateProductController(req, res) {
  const product = updateProduct(req.params.id, req.body);
  if (!product) return res.status(404).json({ error: 'Producto demo no encontrado' });
  res.json(product);
}

export function editProductPrice(req, res) {
  const product = updateProductPrice(req.params.product_price_id, req.body);
  if (!product) return res.status(404).json({ error: 'Precio demo no encontrado' });
  res.json(product);
}

export function deleteProductController(req, res) {
  res.json({ success: deleteProduct(req.params.id) });
}

export function uploadPrices(_req, res) {
  const result = processPriceExcel();
  res.json({ success: true, message: result.message, data: result.products });
}
