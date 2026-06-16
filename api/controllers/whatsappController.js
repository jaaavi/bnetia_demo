import { getStore } from '../data/mockStore.js';
import { createOrder } from '../models/orderModel.js';
import { parseAndMatchOrder } from '../services/aiOrderParserService.js';
import { startWhatsAppSession, stopWhatsAppSession } from '../services/whatsappTransport.js';

export function getConfig(_req, res) {
  res.json({ success: true, data: getStore().whatsapp });
}

export function saveConfig(req, res) {
  Object.assign(getStore().whatsapp, req.body);
  res.json({ success: true, data: getStore().whatsapp });
}

export function getStatus(_req, res) {
  res.json({ connected: getStore().whatsapp.connected, provider: getStore().whatsapp.provider });
}

export function startSession(_req, res) {
  res.json(startWhatsAppSession());
}

export function stopSession(_req, res) {
  res.json(stopWhatsAppSession());
}

export function processIncomingMessage(req, res) {
  const parseResult = parseAndMatchOrder(req.body.message || '');

  const order = createOrder({
    user_name: req.body.wa_name || 'Cliente WhatsApp demo',
    user_phone: req.body.wa_id || '+34600111203',
    origin: 'WhatsApp',
    week_number: parseResult.parsed.week,
    transport_medium: parseResult.parsed.transport,
    items: parseResult.matched,
  });

  res.json({
    success: true,
    action: 'FULL_ORDER',
    message: 'Mensaje demo interpretado por IA mock',
    parseResult,
    data: order,
  });
}
