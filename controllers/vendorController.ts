import * as vendorServices from "../services/vendorServices";
import { RESPONSE_STATUS } from "../utils/constants";
import { Result, ValidationChain, ValidationError, validationResult } from "express-validator";
import { Request, Response, NextFunction, response } from "express";
import { rejects } from "assert";
import { products } from "../returnTypes";
import { QueryResult } from "pg";
import { Validators } from "express-validator/src/chain";

export let addItem: Function = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors: any = validationResult(req);

    if (errors.errors.length > 0) {
      res.status(RESPONSE_STATUS.BAD_REQUEST).json({ errors });
    } else {
      const result:object|string= await vendorServices.addItem(req);

      res.status(RESPONSE_STATUS.CREATED).json({ msg: "Added Successfully" });

    }
  } catch (err: unknown) {
    res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ err });
  }
};

export let updateItem: Function = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors:any= validationResult(req);
    console.log(typeof errors);
    if (errors.length > 0) {
      res.status(RESPONSE_STATUS.BAD_REQUEST).json({ errors });
    }
    else {
      const result: products|string = await vendorServices.updateItem(req);
      res.status(RESPONSE_STATUS.SUCCESS).json({ result: "Updated Successfully" });
    }                
  } catch (error:unknown|any) {
     console.log(error)
    res.status(RESPONSE_STATUS.BAD_REQUEST).json({ error:error.message});
    
  }
};

//Fetch All Products Details
export let showAll: Function = async (req: Request, res: Response): Promise<void> => {
  try {
    const result:QueryResult[]= await vendorServices.showAll(req);
    res.status(RESPONSE_STATUS.SUCCESS).json({ result });
  } catch (err) {
    res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ error: err });
  }
};

export let deleteItem: Function = async (req: Request, res: Response): Promise<void> => {
  try {
    const result:object = await vendorServices.deleteItem(req);
    res.status(RESPONSE_STATUS.SUCCESS).json({ result: "Deleted Successfully" });
  } catch (err:unknown|any) {
    res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
