import express from 'express';
import { registerCompany, getCompanyProfile, updateCompanyProfile, deleteCompanyProfile } from '../controllers/companyController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/multerConfig.js';

const router = express.Router();

router.post('/register', authMiddleware, registerCompany);

router.get('/profile', authMiddleware, getCompanyProfile);

router.put('/profile', authMiddleware, updateCompanyProfile);

router.delete('/profile', authMiddleware, deleteCompanyProfile);

router.post('/upload-logo', authMiddleware, upload.single('logo'), uploadLogo);

export default router;