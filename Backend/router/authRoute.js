import express from 'express'
import protectRoute from '../middleware/protectRoute.js';
import { Signup, login, logout } from '../controller/authController.js';


const router = express.Router();


router.post('/signup', Signup)
router.post('/login', login);
router.post('/logout', logout);



export default router