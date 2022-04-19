import { client1 } from "../database/connectDB"
import { QueryResult } from "pg";

/**
 * This function is a  database related for database related queries and returns object  
 * @param {string} Query is a query passed in service layer funstions. 
 * @param {(string | Date | undefined) []} array is an array of parameters passed in service layer functions. 
 * @returns {Promise<any>}  
*/ 
export async function databaseQuery(Query: string, array?:((string | undefined) [] )| string ): Promise<any>{
    const ans: QueryResult = await client1.query(Query, array);
    return ans;
}