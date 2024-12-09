import { banAccount } from "../controllers/admin-controllers/customerController.js";
import User from "../models/User.js";

const userServices = {

    async createUser(userData){
        const user=new User(userData);
        return user;
    },

    async saveUser(user){
        await user.save();
        return user;
    },

    async getUserByEmailOrUserName(email, userName){
        const user=await User.findOne(userName ? {userName} : {email});
        return user;
    },

    async getUserByID(id){
        const user=await User.findById(id);
        return user;
    },

    async getUsers(){
        const users=await User.find();
        return users;
    },

    async updateUserByID(id, newUserInfo){
        const updatedUser=await User.findByIdAndUpdate(id, newUserInfo);
        return updatedUser;
    },

    async deleteUserByID(id){
        await User.findByIdAndDelete(id);
        return;
    },

    async checkIfUserExists(email, userName){
        const user=await User.findOne({$or: [{email}, {userName}]});
        return user;
    },
    async checkIfUserExistsByEmail(email){
        const user=await User.findOne({email});
        return user?true:false;
    },
    async getAllCustomers(page,limit,sorts){
        const customers=await User.find({role:"user"})
        .sort(sorts).skip((page-1)*limit).limit(limit);
        return customers;
    },

    async banAccount(id){
        const user = await User.findById(id);
        user.status="ban";
        console.log(user);
        await user.save();
    },

    async unbanAccount(id){
        const user = await User.findById(id);
        user.status="active";
        await user.save();
    },
};

export default userServices;