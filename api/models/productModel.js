import { getStore, nextId } from '../data/mockStore.js';

export function getProductsWithPrices() {
  return getStore().products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    unit_of_measure: 'kg',
    prices: [
      {
        product_price_id: product.priceId,
        type: product.type,
        price: product.price,
        currency: 'EUR',
      },
    ],
  }));
}

export function listProducts() {
  return getStore().products;
}

export function createProduct(data) {
  const store = getStore();
  const id = nextId(store.products);
  const product = {
    id,
    priceId: 100 + id,
    name: data.name,
    description: data.description || '',
    type: data.type || 'COW/VACA',
    price: Number(data.price || 0),
  };
  store.products.push(product);
  return product;
}

export function updateProduct(id, data) {
  const product = getStore().products.find((item) => item.id === Number(id));
  if (!product) return null;
  Object.assign(product, {
    name: data.name ?? product.name,
    description: data.description ?? product.description,
    type: data.type ?? product.type,
    price: data.price === undefined ? product.price : Number(data.price),
  });
  return product;
}

export function updateProductPrice(priceId, data) {
  const product = getStore().products.find((item) => item.priceId === Number(priceId));
  if (!product) return null;
  product.price = Number(data.price || product.price);
  return product;
}

export function deleteProduct(id) {
  const store = getStore();
  const index = store.products.findIndex((item) => item.id === Number(id));
  if (index === -1) return false;
  store.products.splice(index, 1);
  return true;
}

export function applyExcelPriceUpdate() {
  getStore().products.forEach((product, index) => {
    product.price = Number((product.price * (1 + ((index % 3) - 1) * 0.025)).toFixed(2));
  });
  return getStore().products;
}
