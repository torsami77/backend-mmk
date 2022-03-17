import express from 'express';
import SMS_Controller from '../../controllers/sms.controller';
import middleware from '../../middlewares';
const { Authenticate, validate, cache_response } = middleware;

const {
  inbound, outbound
} = SMS_Controller;

const router = express.Router();
router.post('/inbound', Authenticate.runVerifyToken, validate('sms'), inbound);
router.post('/outbound', Authenticate.runVerifyToken, validate('sms'), cache_response, outbound);

export default router;
