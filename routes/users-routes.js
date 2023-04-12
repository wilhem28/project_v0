import express from 'express';
import controllers from '../controllers/users-controllers.js';

const router = express.Router();

router.get('/', controllers.getUsers);
router.post('/', controllers.createUser);

export default router;