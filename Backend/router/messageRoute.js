import express from 'express';
import { getMessages, sendMessages } from '../controller/messageController.js';
import protectRoute from '../middleware/protectRoute.js';


const router = express.Router();


router.post('/send/:id', protectRoute, sendMessages);
router.get('/:id', protectRoute, getMessages);


export default router