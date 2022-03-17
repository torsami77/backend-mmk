import { Request, Response }  from "express";
import Redis_Service from '../services/redis';
import database from "../database/database";
import { Account_I } from "../database/models/account.models";
import {
    status, messages, hashPassword, successResponse, errorResponse
} from '../utils/index';

const models = database.models;

export default class SMS_Controller {
    static async inbound (req: Request, res: Response){
        try {
            const { to } = req.body;
            const phoneNumberExits = await models.phone_number_model.findOne({ where: { number: to } });
            if (!phoneNumberExits) {
                return errorResponse(res, status.notfound, messages.inbound.notfound);
            }

            //set redis cache if trimmed text equals STOP
            const pairs = req.body.to + req.body.from;
            if(req.body.text.trim().toLowerCase() === 'stop'){
              await Redis_Service.setCache(`stop${pairs}`, 3600 * 4, pairs);
            }
            return successResponse(res, status.success, messages.inbound.success, {
              to: req.body.to,
              from: req.body.from,
              text: req.body.text,
            });
        } catch(error){
            return errorResponse(res, status.error, messages.inbound.error);
        }
    }

    static async outbound (req: Request, res: Response){
        try {
            const { from } = req.body;
            const phoneNumberExits = await models.phone_number_model.findOne({ where: { number: from } });
            if (!phoneNumberExits) {
                return errorResponse(res, status.notfound, messages.outbound.notfound);
            }

            // checks or sets users count limit
            const countStatus = await Redis_Service.getCache(`count${from}`) || 'nil';
            if(countStatus === '50' || 'nil'){
              await Redis_Service.setCache(`count${from}`, 3600 * 24, '1');
            } else {
              await Redis_Service.setCache(`count${from}`, null, JSON.stringify(parseInt(countStatus + 1)));
            }

            return successResponse(res, status.success, messages.outbound.success, {
              to: req.body.to,
              from: req.body.from,
              text: req.body.text,
            });
        } catch(error){
            return errorResponse(res, status.error, messages.outbound.error);
        }
    }
}