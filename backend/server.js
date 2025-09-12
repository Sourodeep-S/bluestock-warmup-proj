import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import companyRoutes from './src/routes/companyRoutes.js'; // 1. Import company routes

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes); // 2. Use company routes

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});