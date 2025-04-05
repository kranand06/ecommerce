import mongoose from "mongoose";

const Foodschema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    image : {
        type : String,
        default : "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
    },
    desc : {
        type : String,
        required : true
    },
    
    price : {
        type : Number,
        required : true
    },
    cat : {
        type : String,
        required : true
    },
});

const Food = mongoose.model.Food || mongoose.model("Food", Foodschema);

export default Food;