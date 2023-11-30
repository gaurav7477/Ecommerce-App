import express from "express";
import { processPayment, sendStripeApiKey } from "../controllers/paymentController.js";

const router = express.Router();
import {isAuthenicatedUser} from "../middlewares/auth.js";
import e from "express";

router.route("/payment/process").post(isAuthenicatedUser, processPayment);

router.route("/stripeapikey").get(sendStripeApiKey);

export default router;