import express from 'express';
import cors from 'cors'; // 1. Import cors
import authRoutes from './src/routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors()); // 2. Use cors middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});