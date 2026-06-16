import { getStore, nextId } from '../data/mockStore.js';

export function listOrders() {
  return getStore().orders;
}

export function listPendingOrders() {
  return getStore().orders.filter((order) => order.status === 'Pendiente');
}

export function getOrderById(id) {
  return getStore().orders.find((order) => order.id === Number(id)) || null;
}

export function createOrder(data) {
  const store = getStore();
  const items = data.items || [];
  const order = {
    id: nextId(store.orders),
    user_id: data.user_id || 1,
    user_name: data.user_name || 'Cliente demo',
    user_phone: data.user_phone || null,
    origin: data.origin || 'Panel',
    status: 'Pendiente',
    created_at: new Date().toISOString(),
    week_number: Number(data.week_number || 26),
    transport_medium: data.transport_medium || 'Camión refrigerado',
    total_price: Number(data.total_price || items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0), 0)),
    items,
  };
  store.orders.unshift(order);
  return order;
}

export function updateOrder(id, data) {
  const order = getOrderById(id);
  if (!order) return null;
  Object.assign(order, {
    status: data.status ?? order.status,
    total_price: data.total_price === undefined ? order.total_price : Number(data.total_price),
    transport_medium: data.transport_medium ?? order.transport_medium,
    week_number: data.week_number === undefined ? order.week_number : Number(data.week_number),
  });
  return order;
}

export function deleteOrCancelOrder(id) {
  const order = getOrderById(id);
  if (!order) return null;
  order.status = 'Cancelado';
  return order;
}
