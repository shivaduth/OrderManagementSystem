export const RESPONSE_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
};
export const INSERT_PRODUCT: string = `INSERT INTO "Products" (product_id,product_name,brand_name,price,quantity,catogery,sub_catogery) VALUES($1,$2,$3,$4,$5,$6,$7)`;
export const VIEW_PRODUCTS: string = `SELECT * FROM "Products"`;
export const VIEW_PRODUCT: string = `SELECT * FROM "Products" WHERE product_id = $1 `;
export const PRODUCT_EXISTS: string = `SELECT * FROM "Products" WHERE product_name=$1 AND brand_name=$2`;
export const UPDATE_PRODUCT: string = `UPDATE "Products" SET product_name=$1 , brand_name=$2,price=$3,quantity=$4,catogery=$5,sub_catogery=$6 WHERE product_id=$7`;
export const DELETE_PRODUCT: string = `DELETE FROM "Products" WHERE product_id=$1`;
export const UPDATE_PRODUCT_QTY: string = `UPDATE "Products" SET quantity=$1 WHERE product_id=$2`;
export const INSERT_ORDER: string = `INSERT INTO "Orders" (order_id,user_id,username,product_id,product_name,price) VALUES($1,$2,$3,$4,$5,$6)`;
export const VIEW_ORDER: string = `SELECT * FROM "Orders" where order_id = $1`;
export const VIEW_ORDERS: string = `SELECT * FROM "Orders"`;
export const VIEW_PRODUCT_CAT: string = `SELECT * FROM "Products" WHERE catogery=$1`;
export const VIEW_PRODUCT_SUBCAT: string = `SELECT * FROM "Products" WHERE sub_catogery=$1`;
export const VIEW_PRODUCT_CAT_SUBCAT: string = `SELECT * FROM "Products" WHERE catogery=$1 AND sub_catogery=$2 `;
export const VIEW_BY_SEARCH: string = `SELECT * FROM "Products" WHERE product_name LIKE $1 OR brand_name LIKE $1 OR catogery LIKE $1 OR sub_catogery LIKE $1 `;
export const INSERT_USER: string = `INSERT INTO "Users"(user_id,username,role)VALUES($1,$2,$3)`;
export const VIEW_USERS: string = `SELECT *FROM "Users"`;
export const VIEW_USER_BY_ID: string = `SELECT *FROM "Users" WHERE user_id=$1`;
