import express from "express";
import { createOrder, verifyPayment } from "../controler/paymentController.js";
import { checkUserAuth } from '../Middleware/auth.js';

const paymentRouter = express.Router();

paymentRouter.post("/create-order",checkUserAuth, createOrder);
paymentRouter.post("/verify",checkUserAuth, verifyPayment);

export default paymentRouter;