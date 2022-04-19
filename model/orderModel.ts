import { QueryResult } from "pg";
import { client1 } from "../database/connectDB";


const ordersTable = `
CREATE TABLE IF NOT EXISTS public."Orders"
(
    order_id "varchar" NOT NULL,
    user_id "varchar" NOT NULL,
    username "varchar" NOT NULL,
    product_id "varchar" NOT NULL,
    product_name "varchar" NOT NULL,
    price integer NOT NULL,
    CONSTRAINT order_id PRIMARY KEY (order_id)
        INCLUDE(order_id)
);`;

export const orderTable: Function = async () => {
 
  await client1.query(ordersTable, (err: object, data: object) => {
    if (err) {
      console.log(err);
    }
    console.log("Orders Table Created");
    console.log("Done.");
  });
};
