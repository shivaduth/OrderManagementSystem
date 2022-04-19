import { body} from "express-validator";

export const addUserValidation: unknown[] = [
  body("username")
    .notEmpty()
    .withMessage("Username Must be Provided")
    .isLength({ min: 6 })
    .withMessage("Username Must be 6 character Long"),
  body("role")
    .custom((data:string) => {
      if (data === "vendor" || data === "customer" || data === "admin") {
        return true;
      }
      return false;
    })
    .withMessage("Role is Not Valid"),
];
