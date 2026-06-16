import { applyExcelPriceUpdate } from '../models/productModel.js';

export function processPriceExcel() {
  return {
    success: true,
    message: 'Excel demo procesado en memoria',
    products: applyExcelPriceUpdate(),
  };
}
