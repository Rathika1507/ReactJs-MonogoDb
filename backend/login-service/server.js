const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
