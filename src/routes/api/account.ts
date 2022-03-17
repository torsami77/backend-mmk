import express from 'express';
import Account_Controller from '../../controllers/account.controller';
import middleware from '../../middlewares';
const { validate } = middleware;

const {
  sign_up, sign_in
} = Account_Controller;

const router = express.Router();
router.post('/sign_up', validate('signUp'), sign_up);
router.post('/sign_in', validate('signIn'), sign_in);

export default router;
