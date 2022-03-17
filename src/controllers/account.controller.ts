import { Request, Response }  from "express";
import database from "../database/database";
import { Account_I } from "../database/models/account.models";
import {
    status, messages, hashPassword, successResponse, errorResponse, 
    conflictResponse, Jwt, bcrypt
  } from '../utils/index';

const models = database.models;

export default class Account_Controller {
    static async sign_up (req: Request, res: Response){
        try {
            const { username } = req.body;
            const userExits = await models.account_model.findOne({ where: { username } });
            if (userExits) {
              return conflictResponse(res, status.conflict, messages.sign_up.conflict);
            }
            req.body.auth_id = await hashPassword(req.body.auth_id);
            const user = await models.account_model.create(req.body);
            const response = user.toJSON();
            delete response.auth_id;
            // eslint-disable-next-line camelcase
            console.log(user)
            const token = await Jwt.generateToken({ id: response.id, username });
            return successResponse(res, status.created, messages.sign_up.success, response, token);
        } catch(error){
            return errorResponse(res, status.error, messages.sign_up.error);
        }
    }

    static async sign_in (req: Request, res: Response){
        try {
            const { username, auth_id } = req.body;
            const user: any = await models.account_model.findOne({ where: { username } });
            if (!user) {
              return errorResponse(res, status.unauthorized, messages.sign_in.invalid);
            }
            const isPasswordValid = await bcrypt.comparePassword(user.auth_id, auth_id);
            if (!isPasswordValid) {
              return errorResponse(res, status.unauthorized, messages.sign_in.invalid);
            }
            const { id } = user;
            const response = {
              id, 
              username,
            };
            const token = await Jwt.generateToken({ id, username });
            return successResponse(res, status.success, messages.sign_in.success, response, token);
          } catch (error) {
            return errorResponse(res, status.error, messages.sign_in.error);
          }
    }
}