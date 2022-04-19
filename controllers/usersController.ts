import * as userServices from "../services/usersServices";
import { Request, Response, NextFunction } from "express";
import { RESPONSE_STATUS } from "../utils/constants";
import { validationResult } from "express-validator";
import{user} from"../returnTypes"
export let addUser: Function = async (req: Request,res: Response): Promise<void> => {
  try {
    const errors:any= validationResult(req);
    if (errors.errors.length > 0) {
      res.status(RESPONSE_STATUS.BAD_REQUEST).json({ errors });
    } else {
      const result:user|string = await userServices.addUser(req);
      res.status(RESPONSE_STATUS.SUCCESS).json({ result });
    }
  } catch (error) {
    res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ error });
  }
};
export let usersData: Function = async (req: Request,res: Response): Promise<void> => {
  try {
    const result: string = await userServices.userData(req);
    res.status(RESPONSE_STATUS.SUCCESS).json({ result });
  } catch (error) {
    res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ error });
  }
};
