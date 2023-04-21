import express from 'express';
import controllers from '../controllers/users-controllers.js';
import { authenticateToken } from '../middleware/authorization.js';
import multer from '../middleware/multer-config.js';

const router = express.Router();

router.get('/',authenticateToken, controllers.getUsers);
router.post('/',multer, controllers.createUser);

export default router;