import express from 'express'
import cors from 'cors'
import connectDB from './Database/db.js'
import foodRouter from './routes/foodRoute.js'
import mongoose from 'mongoose'
import cartRouter from './routes/cartRoutes.js'


const app = express()
const port = 3000

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//connect db
connectDB();

//api
app.use('/api/food', foodRouter);
app.use('/api/cart', cartRouter);
app.use("/images", express.static('uploads'))

//mongodb+srv://atlas-sample-dataset-load-67eff02a1b498170d9298c77:<db_password>@cluster0.i5o4jir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})