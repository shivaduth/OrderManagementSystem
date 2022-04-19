import { Request, Response, NextFunction } from "express";
import * as QUERY from "../utils/constants";
import * as User from "../model/userModel";
import { client1 } from "../database/connectDB";
import { QueryResult } from "pg";

export const viewUsers = async (req: Request): Promise<QueryResult[]> => {
    try {
      const result: QueryResult = await client1.query(QUERY.VIEW_USERS);   
      return(result.rows);
    } catch (error) {
      throw(error);
    }
};
