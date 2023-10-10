// First of all Import the mongoose.
import mongoose from "mongoose";

// Create a Schema of Collect the data in object form.
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please Provide a Username"],
        unique : true,
    },
    email : {
        type : String,
        required: [true, "Please Provide a Email"],
        unique : true,
    },
    number : {
        type : String,
        required : [true, "Please Provide a Number"],
    },
    password : {
        type : String,
        required : [true, "Please Provide a Password"],
    },
    isVerfied : {
        type : Boolean,
        default : false,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date,
})

const User = mongoose.models.user || mongoose.model("user", userSchema);
// const User = mongoose.models.user || mongoose.model('users', userSchema);

export default User;