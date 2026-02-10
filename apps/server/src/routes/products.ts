import { Router } from 'express';
import { productSchema, createProductSchema } from '@bawaa/shared';

const router = Router();

// GET /api/products - Get all products
router.get('/', (req, res) => {
  res.json({
    products: [
      {
        id: 1,
        name: 'Paracetamol 500mg',
        description: 'Pain relief tablets',
        price: 5.99,
        stock: 100,
        category: 'Medicine'
      },
      {
        id: 2,
        name: 'Vitamin C 1000mg',
        description: 'Immune support',
        price: 12.99,
        stock: 50,
        category: 'Supplements'
      },
    ]
  });
});

// POST /api/products - Create a new product
router.post('/', (req, res) => {
  try {
    const validatedData = createProductSchema.parse(req.body);
    res.status(201).json({
      message: 'Product created successfully',
      product: { id: Date.now(), ...validatedData }
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid product data', details: error });
  }
});

// GET /api/products/:id - Get product by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    product: {
      id: Number(id),
      name: 'Paracetamol 500mg',
      description: 'Pain relief tablets',
      price: 5.99,
      stock: 100,
      category: 'Medicine'
    }
  });
});

export default router;