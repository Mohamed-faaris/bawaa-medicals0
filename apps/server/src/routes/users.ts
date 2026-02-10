import { Router } from 'express';
import { createUserSchema } from '@bawaa/shared';

const router = Router();

// GET /api/users - Get all users
router.get('/', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
    ]
  });
});

// POST /api/users - Create a new user
router.post('/', (req, res) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    res.status(201).json({
      message: 'User created successfully',
      user: { id: Date.now(), ...validatedData }
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid user data', details: error });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    user: { id: Number(id), name: 'John Doe', email: 'john@example.com', role: 'customer' }
  });
});

export default router;