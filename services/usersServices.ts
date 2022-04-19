import { Request, Response, NextFunction } from "express";
import { client1 } from "../database/connectDB";
import * as QUERY from "../utils/constants";
import { v4 as uuidv4 } from "uuid";
import { error } from "console";



export const addUser = async (req: Request): Promise<string> => {
  
    try {
      const id:string = uuidv4()
      const args:object[]=[ id,req.body.username,req.body.role]
      const result:string  = await client1.query(QUERY.INSERT_USER,args);
      return ("Added successfully");    
      
    } catch (error:unknown) { 
      throw (error);
    }

};

export const userData = async (req: Request): Promise<string> => {   
      try {
        const result:string = await client1.query(QUERY.VIEW_USERS);
        return(result);
      } catch (error:unknown) {
        throw (error);
      }
  
  }; 