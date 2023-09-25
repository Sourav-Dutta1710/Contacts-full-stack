import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add user name"]
    },
    email:{
        type:String,
        required:[true,"Please add email"],
        unique:[true,"Email adress already taken"]
    },
    password:{
        type:String,
        required:[true,"Please add a password"]
    }
},{
    timestamps:true
});

export default mongoose.model("User", userSchema)