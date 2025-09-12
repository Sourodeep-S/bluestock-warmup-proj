import express from 'express';
import { registerCompany } from '../controllers/companyController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// This route is protected. 
// The authMiddleware will run before the registerCompany function.
router.post('/register', authMiddleware, registerCompany);

export default router;