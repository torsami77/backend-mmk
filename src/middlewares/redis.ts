import { Request, Response, NextFunction }  from "express";
import Redis_Service from "../services/redis";
import {
    status, messages, hashPassword, successResponse, errorResponse
} from '../utils/index';


const cache_response = async ( req: Request, res: Response, next: NextFunction ) => {
    const pairs = req.body.to + req.body.from;
    if(await Redis_Service.getCache(`stop${pairs}`) === pairs){
        return errorResponse(res, status.unprocessable, `sms ${req.body.from} to ${req.body.from} blocked by STOP request`);
    }
    if(await Redis_Service.getCache(`count${req.body.from}`) === '50'){
        return errorResponse(res, status.unprocessable, `limit reached for from ${req.body.from}`);
    }
    return next();
}

export default cache_response;