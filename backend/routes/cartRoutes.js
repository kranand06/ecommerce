import express from 'express'
import {  addToCart, getCart, deleteFromCart, clearCart } from '../controler/cartController.js'
import { checkUserAuth } from '../Middleware/auth.js'



const cartRouter = express.Router()

cartRouter.post('/add',checkUserAuth, addToCart)
cartRouter.post('/remove', checkUserAuth, deleteFromCart)
cartRouter.get('/clear', checkUserAuth, clearCart)
cartRouter.get('/get', checkUserAuth, getCart)

export default cartRouter;