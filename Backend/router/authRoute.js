import express from 'express'
import protectRoute from '../middleware/protectRoute.js';
import { Signup, login, logout } from '../controller/authController.js';


const router = express.Router();


router.post('/signup', protectRoute, Signup)
router.post('/login', protectRoute, login);
router.post('/logout', protectRoute, logout);



export default router