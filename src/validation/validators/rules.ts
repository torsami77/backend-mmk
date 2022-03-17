import { body, param } from 'express-validator';

const usernameRegex = /^[A-Za-z0-9\-']{2,20}$/;
//const toRegex = /^[0-9\-']{6,11}$/;

export const signUp = [
    body('username', 'username should be alphabets or with numbers, between 2 and 20 characters long')
      .matches(usernameRegex)
      .trim(),
    body('auth_id', 'auth_id should be at least 8 characters')
     .isLength({min: 8}),
    body('confirm_auth_id').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match');
      }
      return true;
    })
];

export const signIn = [
  body('username', 'username should be alphabets or with numbers, between 2 and 20 characters long')
    .matches(usernameRegex)
    .trim(),
  body('auth_id', 'auth_id should be at least 8 characters')
    .isLength({min: 8}),
];

export const sms = [
  body('text', 'text must have min length 1, and max length 120')
  .isLength({ min: 1, max: 120 }),
  body('to', 'the "to" phone number should be numeric, and 6 to 16 characters')
  .isLength({ min: 6, max: 16 })
  .isNumeric(),
  body('from', 'the "from" phone number should be numeric, and 6 to 16 characters')
  .isLength({ min: 6, max: 16 })
  .isNumeric()
];
