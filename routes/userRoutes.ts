import { Router } from "express";
export const router: any = Router();

//Import Controllers
import {addItem,deleteItem,showAll,updateItem,} from "../controllers/vendorController";
import {orderHistory,orderPlace,viewList,viewOne,} from "../controllers/customerController";

import { productAddValidation } from "../middlewares/validation/productValidation";
import { productUpdateValidation } from "../middlewares/validation/productValidation";
import {addUserValidation}from "../middlewares/validation/userValidation"
import { isAdmin, isCustomer, isUserValid, isVendor } from "../auth/auth";
import { usersData } from "../controllers/usersController";
import { addUser } from "../controllers/usersController"
import { viewUsers } from "../controllers/adminController";

//Import Validation

router.post("/vendor/product/add",isUserValid,isVendor,productAddValidation,addItem);

router.put("/vendor/product/update/:id",isUserValid,isVendor,productUpdateValidation,updateItem);

router.get("/vendor/product/showAll", isUserValid,isVendor, showAll);

router.delete("/vendor/product/delete/:id", isUserValid,isVendor, deleteItem);

router.get("/customer/product/viewList", isCustomer,viewList);

router.get("/customer/product/viewOne", isCustomer,viewOne); 

router.get("/customer/product/placeOrder/:id",isUserValid,isCustomer,orderPlace);

router.get( "/customer/product/orderHistory",isUserValid,isCustomer,orderHistory);

router.get("/user/userDetails", isUserValid, usersData);

router.post("/user/addUser", addUserValidation, addUser);

router.get("/admin/viewUsers", isUserValid, isAdmin, viewUsers);
   