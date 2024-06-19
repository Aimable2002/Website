import express from 'express';
import { getAllConversation, getMessages, sendMessages,  getUnreadMessageCount, markMessagesAsRead} from '../controller/messageController.js';
import protectRoute from '../middleware/protectRoute.js';



const router = express.Router();


router.post('/send/:id', protectRoute, sendMessages);
router.get('/:id', protectRoute, getMessages);
router.get('/getAllConv/:id', protectRoute, getAllConversation)
router.get('/unreadCount/:userId', protectRoute, getUnreadMessageCount);
router.post('/markAsRead', protectRoute, markMessagesAsRead);


export default router