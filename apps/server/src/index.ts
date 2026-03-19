import express, { type Request, type Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

import cors from 'cors';

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/orders', (_req: Request, res: Response) => {
  res.json({
    orders: [
      { id: 'ORD-001', status: 'processing', customer: 'Rajesh Kumar', total: '₹485' },
      { id: 'ORD-002', status: 'delivered', customer: 'Priya Kumar', total: '₹340' },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
