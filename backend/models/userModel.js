import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    isEmail: true, // Validate email format
  },
  password: {
    type: String,
    required: true,
    select: false, // Exclude password from query results by default
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  cartData:{
    type: Array,
    default: []
  }
},{minimize: false}); //here minimize false is used to prevent mongoose from removing empty objects from the cartData array

const User = mongoose.model("user", userSchema);

export default User;