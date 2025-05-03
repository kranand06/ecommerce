import express from 'express'
import {  addToCart, getCart, deleteFromCart, clearCart } from '../controler/cartController.js'



const cartRouter = express.Router()

cartRouter.post('/add', addToCart)
cartRouter.get('/remove', deleteFromCart)
cartRouter.get('/clear', clearCart)
cartRouter.get('/get', getCart)

export default cartRouter;