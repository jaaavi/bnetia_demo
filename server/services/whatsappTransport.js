import { getStore } from '../data/mockStore.js';

export function startWhatsAppSession() {
  getStore().whatsapp.connected = true;
  return { status: 'started', qr: 'DEMO-QR-CODE' };
}

export function stopWhatsAppSession() {
  getStore().whatsapp.connected = false;
  return { status: 'stopped' };
}

export function sendWhatsApp(to, message) {
  return {
    success: true,
    to,
    message,
    messageId: `demo-${Date.now()}`,
  };
}
