import express from 'express';
import { getAllConversation, getMessages, sendMessages } from '../controller/messageController.js';
import protectRoute from '../middleware/protectRoute.js';


const router = express.Router();


router.post('/send/:id', protectRoute, sendMessages);
router.get('/:id', protectRoute, getMessages);
router.get('/getAllConv', protectRoute, getAllConversation)


export default router