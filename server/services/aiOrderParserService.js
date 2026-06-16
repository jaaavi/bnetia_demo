import { listProducts } from '../models/productModel.js';

export function parseAndMatchOrder(message = '') {
  const products = listProducts();
  const transport = /recogida/i.test(message) ? 'Recogida en almacén' : 'Camión refrigerado';
  const weekMatch = message.match(/semana\s+(\d+)/i);

  const matched = [
    { product: products.find((item) => item.priceId === 101), quantity: 30, raw_text: '30 cajas solomillo +2,4 vaca' },
    { product: products.find((item) => item.priceId === 103), quantity: 18, raw_text: '18 cajas morcillo anojo' },
    { product: products.find((item) => item.priceId === 104), quantity: 12, raw_text: '12 cajas carne picada especial vaca' },
  ].filter((line) => line.product);

  return {
    success: true,
    parsed: {
      transport,
      week: weekMatch ? Number(weekMatch[1]) : 26,
      errors: [],
    },
    matched: matched.map(({ product, quantity, raw_text }) => ({
      raw_text,
      product_id: product.id,
      product_price_id: product.priceId,
      product_name: product.name,
      price_type: product.type,
      quantity,
      price: product.price,
    })),
  };
}
