import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import communityRoutes from './routes/community';
import bookingRoutes from './routes/bookings';
import chatRoutes from './routes/chat';
import roadmapsRoutes from './routes/roadmaps';
import scholarshipsRoutes from './routes/scholarships';
import resourcesRoutes from './routes/resources';
import eventsRoutes from './routes/events';
import savedRoutes from './routes/saved';
import supportRoutes from './routes/support';
import educationRoutes from './routes/education';
import eventRegistrationsRoutes from './routes/event-registrations';

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
app.use('/api/scholarships', scholarshipsRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/event-registrations', eventRegistrationsRoutes);

app.get('/', (req, res) => {
  res.send('Be You API is running...');
});

if (process.env.NETLIFY !== 'true' && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
