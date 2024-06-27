import express from 'express'
import protectRoute from '../middleware/protectRoute.js';
import { OneTimePayment, paymentSub } from '../controller/subscriptionController.js';
import Subscription from '../Model/subscriptionModel.js';

const router = express.Router();

router.post('/mobile', protectRoute, OneTimePayment);
router.post('/create-payment', protectRoute, paymentSub)

router.post('/mobile-response', )
router.get('/payment-status/:id', protectRoute, async (req, res) => {
    const { userId } = req.params;

    try {
        const subscription = await Subscription.findOne({ userId });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        res.status(200).json({ status: subscription.status });
    } catch (error) {
        console.error('Error fetching subscription:', error);
        res.status(500).json({ message: 'Error fetching subscription', error: error.message });
    }
});


export default router