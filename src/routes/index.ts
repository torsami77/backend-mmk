import * as express from "express";
import authRoutes from './api/account';
import sms from './api/sms'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/sms', sms);

export default router;
