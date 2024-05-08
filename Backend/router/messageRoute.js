import express from 'express';
import { getMessages, sendMessages } from '../controller/messageController.js';


const router = express.Router();


router.post('/send/:id', sendMessages);
router.get('/:id', getMessages);


export default router