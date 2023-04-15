import express from 'express';
import controllers from '../controllers/users-controllers.js';
import { authenticateToken } from '../middleware/authorization.js';

const router = express.Router();

router.get('/',authenticateToken, controllers.getUsers);
router.post('/', controllers.createUser);

export default router;