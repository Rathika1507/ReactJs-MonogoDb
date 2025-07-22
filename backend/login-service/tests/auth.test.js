const request = require('supertest');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('../routes/auth');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use(session({
  secret: 'testsecret',
  resave: false,
  saveUninitialized: false
}));
app.use('/api/auth', authRoutes);

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

afterEach(async () => {
  await User.deleteMany({});
});

describe('Auth API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          phone: '1234567890',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/Registration successful/i);
    });

    it('should not register with existing email', async () => {
      await User.create({ name: 'Test', phone: '123', email: 'test@example.com', password: 'hashed' });
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          phone: '123456789',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        });
      expect(res.statusCode).toBe(500);
      expect(res.body.message).toMatch(/already registered/i);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user', async () => {
      const password = 'password123';
      const hashed = await require('bcryptjs').hash(password, 10);
      await User.create({ name: 'Test', phone: '123', email: 'test@example.com', password: hashed });
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/Login successful/i);
      expect(res.body.user.email).toBe('test@example.com');
    });

    it('should not login with wrong password', async () => {
      const hashed = await require('bcryptjs').hash('password123', 10);
      await User.create({ name: 'Test', phone: '123', email: 'test@example.com', password: hashed });
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'wrongpass' });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/Invalid password/i);
    });
  });
});
