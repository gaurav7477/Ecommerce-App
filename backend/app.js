import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
// route imports
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";
import payment from "./routes/paymentRoute.js";

import errorMiddleWare from "./middlewares/error.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();


// config path
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
// app.get("/", (req, res) => {
//     console.log("working successfully!");
//     res.send("working successfully!");
// });
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Serving Static Files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fullPath = path.join(__dirname, '..', 'frontend', 'build');

app.use(express.static(fullPath));

// Fallback for SPA (React, Vue, etc.)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(fullPath, "index.html"));
});
app.use(errorMiddleWare);


export default app;
