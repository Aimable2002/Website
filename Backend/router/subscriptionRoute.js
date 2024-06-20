import express from 'express'
import protectRoute from '../middleware/protectRoute.js';
import { OneTimePayment, paymentSub } from '../controller/subscriptionController.js';

const router = express.Router();

router.post('/mobile', protectRoute, OneTimePayment);
router.post('/create-payment', protectRoute, paymentSub)

export default router