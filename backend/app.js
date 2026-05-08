import express from 'express'
import cors from 'cors'
import connectDB from './Database/db.js'
import foodRouter from './routes/foodRoute.js'
import cartRouter from './routes/cartRoutes.js'
import userRouter from './routes/userRoutes.js'



const app = express()



//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//connect db
connectDB();

//api

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api/food', foodRouter);
app.use('/api/cart', cartRouter);
app.use('/api/user', userRouter);
app.use("/images", express.static('uploads'))

export default app;
