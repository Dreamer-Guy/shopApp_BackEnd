import mongoose from "mongoose";

const options={discriminatorKey:'role'};
const userSchema= new mongoose.Schema({
    fullName: {type: String, required: true},
    userName: {type: String, required: true,unique:true},
    email: {type: String, required: true,unique:true},
    password: {type: String, required: true},
    avatar:{type:String,
        default:"https://github.com/shadcn.png"},
    role:{
        type:String,
        default:"user",
        enum:["user","staff","admin"]},
    status:{type:String,default:"active"},
    createdAt: {type: Date, default: Date.now},
    status:{
        type:String,
        default:"active",
        enum:["active","ban"]
    },
    lastTimeLogin:{
        type:Date,
        default:Date.now
    },
});
const User=mongoose.model('User',userSchema);
User.createIndexes();

export default User;
