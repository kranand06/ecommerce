import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './Database/db.js'
import foodRouter from './routes/foodRoute.js'
import cartRouter from './routes/cartRoutes.js'
import userRouter from './routes/userRoutes.js'
import paymentRouter from './routes/paymentRoutes.js'
import orderRouter from './routes/orderRoute.js'



const app = express()



//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()) // To parse cookies

//connect db
connectDB();

//api

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api/food', foodRouter);
app.use('/api/cart', cartRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/images", express.static('uploads'))

export default app;
