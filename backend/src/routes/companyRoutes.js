import express from 'express';
import { registerCompany, getCompanyProfile } from '../controllers/companyController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authMiddleware, registerCompany);

router.get('/profile', authMiddleware, getCompanyProfile);

export default router;