import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import communityRoutes from './routes/community';
import bookingRoutes from './routes/bookings';
import chatRoutes from './routes/chat';
import roadmapsRoutes from './routes/roadmaps';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/roadmaps', roadmapsRoutes);

app.get('/', (req, res) => {
  res.send('Be You API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
