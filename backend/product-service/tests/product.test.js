const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('../routes/product');
const productModel = require('../models/productModel');

const app = express();
app.use(express.json());
app.use('/api/v1/', productRouter);

// Mock DB connection
beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Product API', () => {
  beforeEach(async () => {
    await productModel.deleteMany();
  });

  it('should return empty array when no products', async () => {
    const res = await request(app).get('/api/v1/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.products).toEqual([]);
  });

  it('should return products when present', async () => {
    const product = await productModel.create({
      name: 'Test Product',
      price: '10',
      description: 'A test product',
      rating: '5',
      images: [],
      category: 'Test',
      seller: 'Tester',
      stock: '100',
      numOfReviews: '0',
      createdAt: new Date(),
    });
    const res = await request(app).get('/api/v1/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.products.length).toBe(1);
    expect(res.body.products[0].name).toBe('Test Product');
  });

  it('should return single product by id', async () => {
    const product = await productModel.create({
      name: 'Single Product',
      price: '20',
      description: 'A single product',
      rating: '4',
      images: [],
      category: 'Single',
      seller: 'Tester',
      stock: '50',
      numOfReviews: '0',
      createdAt: new Date(),
    });
    const res = await request(app).get(`/api/v1/product/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.product.name).toBe('Single Product');
  });

  it('should return 404 for invalid product id', async () => {
    const res = await request(app).get('/api/v1/product/123456789012');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
