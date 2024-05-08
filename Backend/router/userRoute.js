import express from 'express';
import { popLoggedUser, popUser } from '../controller/userController.js';


const router = express.Router();

router.get('/allUser', popUser);
router.get('/logUser', popLoggedUser);


export default router