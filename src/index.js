import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI;

app.use(cors());
app.use(json());

import userRoutes from './routes/users'; // Adjust the path as per your directory structure
import questionRoutes from './routes/questions';
import authRoutes from './routes/auth';

app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);



connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
