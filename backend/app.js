import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
// route imports
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";

import errorMiddleWare from "./middlewares/error.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


// Route Imports
app.get("/", (req, res) => {
    console.log("working successfully!");
    res.send("working successfully!");
});
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// middlewares for errors
app.use(errorMiddleWare);


export default app;
