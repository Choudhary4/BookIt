import express from 'express';
import { validatePromoCode } from '../controllers/promoController.js';

const router = express.Router();

router.post('/validate', validatePromoCode);

export default router;
