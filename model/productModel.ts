import { QueryResult } from "pg";
import { client1 } from "../database/connectDB";



const productsTable = `
CREATE TABLE IF NOT EXISTS public."Products"
(
    product_id "varchar" NOT NULL,
    product_name "varchar" NOT NULL,
    brand_name "varchar" NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL,
    catogery "varchar" NOT NULL,
    sub_catogery "varchar" NOT NULL,
    CONSTRAINT "Products_pkey" PRIMARY KEY (product_id)
)`;

export const productTable: Function = async () => {  
  await client1.query(productsTable, (err: object, data: object) => {
    if (err) {
      console.log(err);
    }
    console.log("Products Table Created.");
  });
  
};
