import express from 'express';
import { popLoggedUser, popUser } from '../controller/userController.js';
import protectRoute from '../middleware/protectRoute.js';


const router = express.Router();

router.get('/allUser', protectRoute, popUser);
router.get('/logUser', protectRoute, popLoggedUser);


export default router