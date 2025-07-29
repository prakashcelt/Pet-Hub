import express from 'express';
import { authenticateToken } from '../middlewares/jwt.js';
import { getAllClinics, getFacilitiesByClinic } from '../controller/externalController.js';

const router = express.Router();

router.use(authenticateToken)

router.get('/clinics', getAllClinics);

// Get facilities by clinic_id
router.get('/facilities/:clinic_id', getFacilitiesByClinic);



export default router;
