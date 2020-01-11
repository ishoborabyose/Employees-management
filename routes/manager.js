import express from 'express';
import validatesignup from '../middleware/validatemanagersignup';
import validatesignin from '../middleware/validatemanagersignin'
import manager from '../controller/manager';

const router = express.Router();

router.post('/signup', validatesignup, manager.signup);
router.post('/signin', validatesignin, manager.signin);

export default router;