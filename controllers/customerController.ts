import * as customerServices from "../services/customerServices"
import { Request, Response, NextFunction } from "express";
import { RESPONSE_STATUS } from "../utils/constants";
import { products } from "../returnTypes";
import { QueryResult } from "pg";

export let viewList: Function = async (req: Request,res: Response): Promise<void> => {
  try {
    const result:string|object = await customerServices.viewList(req);
    res.status(RESPONSE_STATUS.SUCCESS).json({ result });
  } catch (error) {
    res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ error });
  }
}; 

export let viewOne: Function = async (req: Request, res: Response): Promise<void> => {

  try {
    const result: Object|string = await customerServices.viewOne(req);
    res.status(RESPONSE_STATUS.SUCCESS).json({ data: result });
  } catch (err) {
    res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ error: err });
  }
};
export let orderPlace: Function = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderDetails:string|object = await customerServices.orderPlace(req);
    res.status(RESPONSE_STATUS.SUCCESS).json({ orderDetails });
  } catch (error) {
    res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ error });
  }
};
export let orderHistory: Function = async (req: Request, res: Response): Promise<void> => {
  try {
    const result:Object = await customerServices.orderHistory(req);
    res.status(RESPONSE_STATUS.SUCCESS).json({ result });
  } catch (error) {
    res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ error });
  }
};
