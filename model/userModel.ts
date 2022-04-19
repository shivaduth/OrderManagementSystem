import { QueryResult } from "pg";

import { client1 } from "../database/connectDB";




const usersTable = `
CREATE TABLE IF NOT EXISTS public."Users"
(
    user_id "varchar" NOT NULL,
    username "varchar" NOT NULL,
    role "varchar" NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY (user_id)
);`;

export const createUserTable: Function = async () => {
  await client1.query(usersTable, (err: object, data: object) => {
    if (err) {
      console.log(err);
    }
    console.log("Users Table Created.");
  });
};
