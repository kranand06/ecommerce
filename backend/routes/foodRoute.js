import express from 'express'
import { addFood, deleteFood, listFood } from '../controler/foodController.js'
import multer from 'multer'


const foodRouter = express.Router()

const storage = multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

foodRouter.post('/add',upload.single("image"), addFood)
foodRouter.get('/list', listFood)
foodRouter.get('/delete/:id', deleteFood)

export default foodRouter;