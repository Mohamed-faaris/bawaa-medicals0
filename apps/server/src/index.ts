import express, { type Request, type Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

import cors from 'cors';

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API' });
});

app.all('', (req: Request, res: Response) => {
  res.status(404).send(
    `bawaa-medicals API is running. check <a href="${req.protocol}://${req.get('host')}/api/health">health</a> for status.`
  );
});


app.listen(PORT, () => {
  console.log(`express Server running on http://localhost:${PORT}`);
});
