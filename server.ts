import express from "express";
import { connectDB } from "./database/connectDB";
import { router as userRoute } from "./routes/userRoutes";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "./config/.env") });

//Creating Express App
const app = express();

//Connection to Database
connectDB();

//Setting Up Middleware
app.use(express.json());

//Setting Up Routes
//User Routes
app.use("/", userRoute);

//Starting  App on the Port
app.listen(process.env.appPORT, () => {
  console.log(`Server Running at http://localhost:${process.env.appPORT}`);
});
