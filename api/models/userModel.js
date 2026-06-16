import { getStore, nextId } from '../data/mockStore.js';

export function listUsers() {
  return getStore().users;
}

export function getUserById(id) {
  return getStore().users.find((user) => user.id === Number(id)) || null;
}

export function createUser(data) {
  const store = getStore();
  const user = {
    id: nextId(store.users),
    name: data.name,
    email: data.email,
    role: data.role || 'user',
    phone: data.phone || '',
  };
  store.users.push(user);
  return user;
}

export function updateUser(id, data) {
  const user = getUserById(id);
  if (!user) return null;
  Object.assign(user, {
    name: data.name ?? user.name,
    email: data.email ?? user.email,
    role: data.role ?? user.role,
    phone: data.phone ?? user.phone,
  });
  return user;
}

export function deleteUser(id) {
  const store = getStore();
  const index = store.users.findIndex((user) => user.id === Number(id));
  if (index === -1) return false;
  store.users.splice(index, 1);
  return true;
}
