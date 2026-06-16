import express from 'express';
import cors from 'cors';
import authRoutes from '../server/routes/authRoutes.js';
import ordersRoutes from '../server/routes/ordersRoutes.js';
import productsRoutes from '../server/routes/productsRoutes.js';
import usersRoutes from '../server/routes/usersRoutes.js';
import allowedPhonesRoutes from '../server/routes/allowedPhonesRoutes.js';
import whatsappRoutes from '../server/routes/whatsappRoutes.js';
import aiOrderRoutes from '../server/routes/aiOrderRoutes.js';
import demoRoutes from '../server/routes/demoRoutes.js';
import { errorHandler } from '../server/middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({
    success: true,
    message: 'BNETIA demo API funcionando con mock data',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/admin', allowedPhonesRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/ai-orders', aiOrderRoutes);
app.use('/api/demo', demoRoutes);

app.use(errorHandler);

export default app;
