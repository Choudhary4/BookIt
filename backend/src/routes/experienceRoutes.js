import express from 'express';
import {
  getAllExperiences,
  getExperienceById,
} from '../controllers/experienceController.js';

const router = express.Router();

router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);

export default router;
