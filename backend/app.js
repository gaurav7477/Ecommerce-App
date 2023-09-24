import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// route imports
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";

import errorMiddleWare from "./middlewares/error.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


// Route Imports
app.use("/api/v1", product);
app.use("/api/v1", user);

// middlewares for errors
app.use(errorMiddleWare);


export default app;
