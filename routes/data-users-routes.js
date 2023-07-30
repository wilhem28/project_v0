import express from 'express';
import controllers from '../controllers/data-user-controllers.js';
import { authenticateToken } from '../middleware/authorization.js';

const router = express.Router();

router.post('/',authenticateToken, controllers.createDataProduct);

export default router;




