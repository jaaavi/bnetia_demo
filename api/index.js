import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import allowedPhonesRoutes from './routes/allowedPhonesRoutes.js';
import whatsappRoutes from './routes/whatsappRoutes.js';
import aiOrderRoutes from './routes/aiOrderRoutes.js';
import demoRoutes from './routes/demoRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

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
