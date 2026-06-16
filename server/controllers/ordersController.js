import {
  createOrder,
  deleteOrCancelOrder,
  getOrderById,
  listOrders,
  listPendingOrders,
  updateOrder,
} from '../models/orderModel.js';

export function getOrders(_req, res) {
  res.json(listOrders());
}

export function getAllOrders(_req, res) {
  res.json(listOrders());
}

export function getPendingOrders(_req, res) {
  res.json({ success: true, data: listPendingOrders() });
}

export function getOrder(req, res) {
  const order = getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Pedido demo no encontrado' });
  res.json(order);
}

export function createOrderController(req, res) {
  res.status(201).json(createOrder(req.body));
}

export function updateOrderController(req, res) {
  const order = updateOrder(req.params.id, req.body);
  if (!order) return res.status(404).json({ error: 'Pedido demo no encontrado' });
  res.json(order);
}

export function deleteOrder(req, res) {
  const order = deleteOrCancelOrder(req.params.id);
  if (!order) return res.status(404).json({ error: 'Pedido demo no encontrado' });
  res.json(order);
}

export function confirmOrder(req, res) {
  const order = updateOrder(req.params.id, {
    status: 'Validado',
    total_price: req.body.total_price,
  });
  if (!order) return res.status(404).json({ success: false, error: 'Pedido demo no encontrado' });
  res.json({ success: true, status: order.status, data: order, message: 'Pedido demo validado' });
}

export function rejectOrder(req, res) {
  const order = updateOrder(req.params.id, { status: 'Rechazado' });
  if (!order) return res.status(404).json({ success: false, error: 'Pedido demo no encontrado' });
  res.json({ success: true, data: order });
}
