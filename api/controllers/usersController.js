import { createUser, deleteUser, getUserById, listUsers, updateUser } from '../models/userModel.js';

export function getUsers(_req, res) {
  res.json(listUsers());
}

export function getUser(req, res) {
  const user = getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario demo no encontrado' });
  res.json(user);
}

export function createUserController(req, res) {
  res.status(201).json(createUser(req.body));
}

export function updateUserController(req, res) {
  const user = updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: 'Usuario demo no encontrado' });
  res.json(user);
}

export function deleteUserController(req, res) {
  res.json({ success: deleteUser(req.params.id) });
}
