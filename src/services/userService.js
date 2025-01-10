import { hashPassword,comparePlainAndHashed } from "../utils/hashAndCompare.js";
import User from "../models/User.js";


const CUSTOMER_ROLE = "user";
const STAFF_ROLE = "staff";
const ADMIN_ROLE = "admin";

const getAllUsersBasedOnRole = async (role,page,limit,sort) => {
    const users=await User.find({role})
        .sort(sort).skip((page-1)*limit).limit(limit)||[];
    return users;
};

const countUsersBasedOnRole = async (role) => {
    const totalUsers = await User.countDocuments({
        role
    });
    return totalUsers;
};


const userServices = {

    async createUser(userData){
        const user=new User(userData);
        return user;
    },

    async saveUser(user){
        await user.save();
        return user;
    },

    async isUserExist(emailOrUserName){
        return await User.exists({$or: [{email: emailOrUserName}, {userName: emailOrUserName}]});
    },
    
    async isUserExistById(id){
        return await User.exists({_id:id});
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
        const updatedUser=await User.findByIdAndUpdate(id, newUserInfo,{new:true});
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
    async checkIfUserExistsByUserName(userName){
        return  await User.exists({userName});
    },
    async checkIfUserExistsByEmail(email){
        const user=await User.findOne({email});
        return user?true:false;
    },
    async getAllCustomers(page,limit,sort){
        const customers=await getAllUsersBasedOnRole(CUSTOMER_ROLE,page,limit,sort);
        return customers;
    },
    async countCustomers(){
        const totalCustomers=await countUsersBasedOnRole(CUSTOMER_ROLE);
        return totalCustomers;
    },

    async getAllStaffs(page,limit,sort){
        const staffs=await getAllUsersBasedOnRole(STAFF_ROLE,page,limit,sort);
        return staffs;
    },

    async countStaffs(){
        return await countUsersBasedOnRole(STAFF_ROLE);
    },

    async banAccount(id){
        const user = await User.findById(id);
        user.status="ban";
        await user.save();
    },

    async unbanAccount(id){
        const user = await User.findById(id);
        user.status="active";
        await user.save();
    },

    async countCustomersInTimeRange(timeRange){
        const totalCustomers = await User.countDocuments({
            role: CUSTOMER_ROLE,
            createdAt:{
                $gte:timeRange.start,
                $lte:timeRange.end
            }
        });
        return totalCustomers;
    },
    async changePassword(userId,oldPassword,newPassword){
        const user=await User.findById(userId);
        if(!user){
            return {success:false,message:"User not found"};
        }
        const isPasswordCorrect=await comparePlainAndHashed(oldPassword,user.password);
        if(!isPasswordCorrect){
            return {success:false,message:"Old password is incorrect"};
        }
        const hashedNewPassword=await hashPassword(newPassword);
        user.password=hashedNewPassword;
        await user.save();
        return {success:true,message:user};
    }
};

export default userServices;