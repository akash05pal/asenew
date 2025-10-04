const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const Product = require('../src/models/Product');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Product.deleteMany({});
});

describe('Product API Tests', () => {
  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({
          name: 'Test Product',
          description: 'Test Description',
          stock_quantity: 100,
          low_stock_threshold: 20,
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Test Product');
      expect(response.body.stock_quantity).toBe(100);
    });

    it('should fail without product name', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({
          description: 'Test Description',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      await Product.create({ name: 'Product 1', stock_quantity: 50 });
      await Product.create({ name: 'Product 2', stock_quantity: 30 });

      const response = await request(app).get('/api/products');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get a product by ID', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 50,
      });

      const response = await request(app).get(`/api/products/${product._id}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Test Product');
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).get(`/api/products/${fakeId}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update a product', async () => {
      const product = await Product.create({
        name: 'Old Name',
        stock_quantity: 50,
      });

      const response = await request(app)
        .put(`/api/products/${product._id}`)
        .send({
          name: 'New Name',
          stock_quantity: 75,
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('New Name');
      expect(response.body.stock_quantity).toBe(75);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete a product', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 50,
      });

      const response = await request(app).delete(`/api/products/${product._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product deleted successfully');

      const deletedProduct = await Product.findById(product._id);
      expect(deletedProduct).toBeNull();
    });
  });

  describe('PATCH /api/products/:id/increase', () => {
    it('should increase stock quantity', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 50,
      });

      const response = await request(app)
        .patch(`/api/products/${product._id}/increase`)
        .send({ amount: 25 });

      expect(response.status).toBe(200);
      expect(response.body.stock_quantity).toBe(75);
    });

    it('should fail with negative amount', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 50,
      });

      const response = await request(app)
        .patch(`/api/products/${product._id}/increase`)
        .send({ amount: -10 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Amount must be a positive number');
    });

    it('should fail with zero amount', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 50,
      });

      const response = await request(app)
        .patch(`/api/products/${product._id}/increase`)
        .send({ amount: 0 });

      expect(response.status).toBe(400);
    });
  });

  describe('PATCH /api/products/:id/decrease', () => {
    it('should decrease stock quantity', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 50,
      });

      const response = await request(app)
        .patch(`/api/products/${product._id}/decrease`)
        .send({ amount: 20 });

      expect(response.status).toBe(200);
      expect(response.body.stock_quantity).toBe(30);
    });

    it('should fail when trying to decrease below zero', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 50,
      });

      const response = await request(app)
        .patch(`/api/products/${product._id}/decrease`)
        .send({ amount: 60 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Insufficient stock');
    });

    it('should fail with negative amount', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 50,
      });

      const response = await request(app)
        .patch(`/api/products/${product._id}/decrease`)
        .send({ amount: -10 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Amount must be a positive number');
    });

    it('should allow decreasing stock to exactly zero', async () => {
      const product = await Product.create({
        name: 'Test Product',
        stock_quantity: 50,
      });

      const response = await request(app)
        .patch(`/api/products/${product._id}/decrease`)
        .send({ amount: 50 });

      expect(response.status).toBe(200);
      expect(response.body.stock_quantity).toBe(0);
    });
  });

  describe('GET /api/products/low-stock', () => {
    it('should return products with low stock', async () => {
      await Product.create({
        name: 'Low Stock Product 1',
        stock_quantity: 5,
        low_stock_threshold: 10,
      });
      await Product.create({
        name: 'Low Stock Product 2',
        stock_quantity: 8,
        low_stock_threshold: 15,
      });
      await Product.create({
        name: 'Normal Stock Product',
        stock_quantity: 50,
        low_stock_threshold: 10,
      });

      const response = await request(app).get('/api/products/low-stock');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });

    it('should return empty array when no low stock products', async () => {
      await Product.create({
        name: 'Normal Stock Product',
        stock_quantity: 50,
        low_stock_threshold: 10,
      });

      const response = await request(app).get('/api/products/low-stock');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
    });
  });
});
