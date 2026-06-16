import { getStore, resetStore } from '../data/mockStore.js';

export function bootstrap(_req, res) {
  res.json({ success: true, data: getStore() });
}

export function reset(_req, res) {
  res.json({ success: true, data: resetStore() });
}
