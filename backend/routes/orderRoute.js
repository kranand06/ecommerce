import express from 'express'
import {  getOrders, OrderDetail} from '../controler/orderController.js'
import { checkUserAuth } from '../Middleware/auth.js'



const orderRouter = express.Router()

orderRouter.get('/myorders',checkUserAuth, getOrders)
orderRouter.get('/myorders/:id',checkUserAuth, OrderDetail)

export default orderRouter;