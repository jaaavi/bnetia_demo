import { createPhone, deletePhone, listPhones, updatePhone } from '../models/allowedPhonesModel.js';

export function getAllowedPhones(_req, res) {
  res.json({ success: true, data: listPhones() });
}

export function addAllowedPhone(req, res) {
  res.status(201).json({ success: true, data: createPhone(req.body) });
}

export function updateAllowedPhone(req, res) {
  const phone = updatePhone(req.params.id, req.body);
  if (!phone) return res.status(404).json({ success: false, error: 'Teléfono demo no encontrado' });
  res.json({ success: true, data: phone });
}

export function toggleAllowedPhone(req, res) {
  const phone = updatePhone(req.params.id, { is_active: req.body.is_active });
  if (!phone) return res.status(404).json({ success: false, error: 'Teléfono demo no encontrado' });
  res.json({ success: true, data: phone });
}

export function deleteAllowedPhone(req, res) {
  res.json({ success: deletePhone(req.params.id) });
}
