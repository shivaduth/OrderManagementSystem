import { Request, Response, NextFunction } from "express";
import { RESPONSE_STATUS } from "../utils/constants";
import * as User from "../model/userModel"
import * as QUERY from "../utils/constants";
import{user}from "../returnTypes"
import { client1 } from "../database/connectDB";
import { QueryResult } from "pg";

export const isCustomer: Function = async (req: Request,res: Response,next: NextFunction) => {
  const user :QueryResult= await client1.query(QUERY.VIEW_USER_BY_ID, [req.headers.user_id]);
  if (user.rows.length > 0 && user.rows[0]?.role === "customer") {
    next();
  } else {
    res.status(RESPONSE_STATUS.UNAUTHORIZED).json({ error: "Your Are Not Authorized to visit This " });
  }
};

export const isVendor: Function = async (req: Request,res: Response,next: NextFunction) => {
  // console.log("isvendor")
  const user:QueryResult = await client1.query(QUERY.VIEW_USER_BY_ID, [req.headers.user_id]);
  // console.log(user.rows)
 
  if (user.rows.length > 0 && user.rows[0]?.role === "vendor") {
    next();
  } else {
    res.status(RESPONSE_STATUS.UNAUTHORIZED).json({ error: "Your Are Not Authorized to visit This " });
  }
};
 
export const isUserValid: Function = async (req: Request,res: Response,next: NextFunction) => {
  if (req.headers.user_id) {
    const userData:QueryResult = await client1.query(QUERY.VIEW_USER_BY_ID,[req.headers.user_id]);
    if (userData.rows.length === 0) {
      res.status(RESPONSE_STATUS.UNAUTHORIZED).json({ error: "Invalid User ID " });
      return;
    }
    next();
  } else {
    res.status(RESPONSE_STATUS.UNAUTHORIZED).json({ error: "Not Authorized" });
  }
};

export const isAdmin: Function = async (req: Request,res: Response,next: NextFunction) => {
  const userData:QueryResult = await client1.query(QUERY.VIEW_USER_BY_ID, [req.headers.user_id]);
  if (req.headers.user_id && userData.rows[0]?.role === "admin") {
    next();
  } else {
    res.status(RESPONSE_STATUS.UNAUTHORIZED).json({ error: "Your Are Not Authorized to visit This " });
  }
};
