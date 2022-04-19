import * as adminServices from "../services/adminServices";
import { Request, Response, NextFunction } from "express";
import { RESPONSE_STATUS } from "../utils/constants";
import { validationResult } from "express-validator";
import { user } from "../returnTypes";
export let viewUsers: Function = async (req: Request,res: Response): Promise<void> => {
  try {
    const users: object = await adminServices.viewUsers(req);
    res.status(RESPONSE_STATUS.SUCCESS).json({ users });
  } catch (error) {
    res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ error });
  }
};
  