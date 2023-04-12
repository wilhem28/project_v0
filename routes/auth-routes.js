import express from 'express';
import authControllers from '../controllers/auth-controllers.js';


const router = express.Router();

router.post('/login', authControllers.loginUser);

export default router;