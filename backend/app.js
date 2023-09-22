import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import product from "./routes/productRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


// Route Imports
app.use("/api/v1", product);




export default app;
