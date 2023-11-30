import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import Stripe  from 'stripe';
import dotenv from "dotenv";

dotenv.config({ path: "./backend/config/config.env" });
const stripe = new Stripe(process.env.STRIPESECERTKEY);
export const processPayment = catchAsyncErrors(async (req, res, next) => {
 
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});