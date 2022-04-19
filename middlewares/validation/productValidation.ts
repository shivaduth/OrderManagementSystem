import { body, param } from "express-validator";

export const productAddValidation: unknown[] = [
  body("product_name")
    .notEmpty()
    .withMessage("Product Name is Required")
    .isString()
    .withMessage("Invalid Product Name"),
  body("brand_name")
    .notEmpty()
    .withMessage("Brand Name is Required")
    .isString()
    .withMessage("Invalid Brand Name"),
  body("price")
    .notEmpty()
    .withMessage("Price  is Required")
    .custom((data: number) => {
      if (typeof data == "string") { 
        return false;
      }
      return true;
    })
    .withMessage("Invalid Price "),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity  is Required")
    .custom((data: number) => {
      if (typeof data == "string") {
        return false;
      }
      return true;
    })
    .withMessage("Invalid Quantity "),
  body("catogery")
    .notEmpty()
    .withMessage("Category Name is Required")
    .isString()
    .withMessage("Invalid Category Name"),
  body("sub_catogery")
    .notEmpty()
    .withMessage("Sub-Category Name is Required")
    .isString()
    .withMessage("Invalid Sub-Category Name"),
];

export const productUpdateValidation : object[] = [

  param("id")
    .notEmpty()
    .withMessage("Invalid id"),
  body("product_name")
    .custom((id)=>{
      if(id.length>0){
        return true;
      }
      return false;
    })
    .withMessage("Product Name is Required")
    .isString()
    .withMessage("Invalid Product Name")
   

];
