import mongoose from "mongoose";

const options={discriminatorKey:'role'};
const userSchema= new mongoose.Schema({
    fullName: {type: String, required: true},
    userName: {type: String, required: true,unique:true},
    email: {type: String, required: true,unique:true},
    password: {type: String, required: true},
    avatar:{type:String,default:""},
    role:{type:String,default:"user"},
    status:{type:String,default:"active"},
    createdAt: {type: Date, default: Date.now},
    status:{
        type:String,
        default:"active",
        enum:["active","ban"]
    }
});
const User=mongoose.model('User',userSchema);
User.createIndexes();
const StaffSchema = new mongoose.Schema({
    role:{type:String,default:"staff"},
    salary:{ type: Number, required: true },
    phone:{ type: String, required: true },
    address:{ type: String, required: true },
}, options);

//it add another attribute to the user model _t:"staff"
const Staff = User.discriminator('staff', StaffSchema);
export default User;

export {Staff};