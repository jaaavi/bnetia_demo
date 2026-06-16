const initialProducts = [
  { id: 1, priceId: 101, name: 'Solomillo +2,4', description: 'Corte premium de vaca', type: 'COW/VACA', price: 14.8 },
  { id: 2, priceId: 102, name: 'Solomillo +2', description: 'Caja estándar', type: 'YB/ANOJO', price: 13.6 },
  { id: 3, priceId: 103, name: 'Morcillo', description: 'Preparado para mayorista', type: 'YB/ANOJO', price: 8.35 },
  { id: 4, priceId: 104, name: 'Carne picada especial', description: 'Formato hostelería', type: 'COW/VACA', price: 6.9 },
  { id: 5, priceId: 105, name: 'Lomo bajo', description: 'Pieza limpia en caja', type: 'COW/VACA', price: 11.4 },
  { id: 6, priceId: 106, name: 'Tapa', description: 'Corte magro', type: 'YB/ANOJO', price: 9.2 },
  { id: 7, priceId: 107, name: 'Aguja', description: 'Caja calibrada', type: 'COW/VACA', price: 7.75 },
  { id: 8, priceId: 108, name: 'Carrillera', description: 'Caja hostelería', type: 'COW/VACA', price: 10.1 },
];

const initialUsers = [
  { id: 1, name: 'Admin Demo', email: 'admin@demo.local', role: 'admin', phone: '+34600111222' },
  { id: 2, name: 'Carnicería La Plaza', email: 'plaza@demo.local', role: 'user', phone: '+34600111203' },
  { id: 3, name: 'Restaurante El Mercado', email: 'mercado@demo.local', role: 'user', phone: '+34600777888' },
];

const initialOrders = [
  {
    id: 1840,
    user_id: 2,
    user_name: 'Carnicería La Plaza',
    user_phone: '+34600111203',
    origin: 'WhatsApp',
    status: 'Pendiente',
    created_at: '2026-06-16T09:30:00.000Z',
    week_number: 25,
    transport_medium: 'Camión refrigerado',
    total_price: 677.1,
    items: [
      { product_id: 1, product_price_id: 101, product_name: 'Solomillo +2,4', price_type: 'COW/VACA', quantity: 30, price: 14.8 },
      { product_id: 3, product_price_id: 103, product_name: 'Morcillo', price_type: 'YB/ANOJO', quantity: 18, price: 8.35 },
      { product_id: 4, product_price_id: 104, product_name: 'Carne picada especial', price_type: 'COW/VACA', quantity: 12, price: 6.9 },
    ],
  },
  {
    id: 1839,
    user_id: 3,
    user_name: 'Restaurante El Mercado',
    user_phone: null,
    origin: 'Panel',
    status: 'Entregado',
    created_at: '2026-06-12T10:15:00.000Z',
    week_number: 24,
    transport_medium: 'Ruta semanal centro',
    total_price: 641.2,
    items: [
      { product_id: 5, product_price_id: 105, product_name: 'Lomo bajo', price_type: 'COW/VACA', quantity: 42, price: 11.4 },
      { product_id: 6, product_price_id: 106, product_name: 'Tapa', price_type: 'YB/ANOJO', quantity: 18, price: 9.2 },
    ],
  },
];

const initialPhones = [
  { id: 1, phone_number: '+34600111203', phone_name: 'Carnicería La Plaza', is_active: true, created_at: '2026-06-10T08:00:00.000Z' },
  { id: 2, phone_number: '+34600777888', phone_name: 'Restaurante El Mercado', is_active: true, created_at: '2026-06-11T08:00:00.000Z' },
  { id: 3, phone_number: '+34600999000', phone_name: 'Proveedor demo', is_active: false, created_at: '2026-06-12T08:00:00.000Z' },
];

const state = {
  products: structuredClone(initialProducts),
  users: structuredClone(initialUsers),
  orders: structuredClone(initialOrders),
  phones: structuredClone(initialPhones),
  whatsapp: { connected: false, provider: 'whatsapp-web', phone_number: '+34600111222' },
};

export function resetStore() {
  state.products = structuredClone(initialProducts);
  state.users = structuredClone(initialUsers);
  state.orders = structuredClone(initialOrders);
  state.phones = structuredClone(initialPhones);
  state.whatsapp = { connected: false, provider: 'whatsapp-web', phone_number: '+34600111222' };
  return getStore();
}

export function getStore() {
  return state;
}

export function nextId(collection) {
  return Math.max(0, ...collection.map((item) => Number(item.id) || 0)) + 1;
}
