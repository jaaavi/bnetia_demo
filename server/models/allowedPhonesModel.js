import { getStore, nextId } from '../data/mockStore.js';

export function listPhones() {
  return getStore().phones;
}

export function createPhone(data) {
  const store = getStore();
  const phone = {
    id: nextId(store.phones),
    phone_number: data.phone_number,
    phone_name: data.phone_name || 'Sin nombre',
    is_active: true,
    created_at: new Date().toISOString(),
  };
  store.phones.push(phone);
  return phone;
}

export function updatePhone(id, data) {
  const phone = getStore().phones.find((item) => item.id === Number(id));
  if (!phone) return null;
  Object.assign(phone, {
    phone_number: data.phone_number ?? phone.phone_number,
    phone_name: data.phone_name ?? phone.phone_name,
    is_active: data.is_active ?? phone.is_active,
  });
  return phone;
}

export function deletePhone(id) {
  const store = getStore();
  const index = store.phones.findIndex((phone) => phone.id === Number(id));
  if (index === -1) return false;
  store.phones.splice(index, 1);
  return true;
}
