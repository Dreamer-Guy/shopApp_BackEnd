import staffService from "../../services/staffService.js";
import userService from "../../services/userService.js";
import {hashPassword,comparePlainAndHashed} from "../../utils/hashAndCompare.js";

const SUCCESS = 200;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;
const DEFAULT_PASSWORD=await hashPassword(process.env.DEFAULT_STAFF_PASSWORD);
const STAFF_ROLE="staff";

const isMissingAccountFields=(req)=>{
    const {fullName,userName,email}=req.body;
    const isForgetFields= !fullName || !userName || !email;
    const isEmptyFields= (fullName?.trim()==="") || (userName?.trim()==="") || (email?.trim()==="");
    return isForgetFields || isEmptyFields;
};

const isMissingStaffProperties=(req)=>{
    const {salary,phone,address}=req.body.staffProperties;
    const isForgetFields= !salary || !phone || !address;
    const isEmptyFields= (phone?.trim()==="") || (address?.trim()==="");
    return isForgetFields || isEmptyFields;
};

const fullfillAccountSchema=(fullName,userName,email)=>{
    return {
        fullName,
        userName,
        email,
        password:DEFAULT_PASSWORD,
        role:STAFF_ROLE
    }
};

const formatDate=(date)=>{
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};

const getFormattedQuery=(query)=>{
    const {page,limit,sort}=query;
    for(const key in sort){
        sort[key]=parseInt(sort[key]);
    }
    return {page,limit,sort};
};

const getAllStaffs=async(req,res)=>{
    try{
        const {page,limit,sort}=getFormattedQuery(req.query);
        const staffs=await userService.getAllStaffs(page,limit,sort);
        const totalStaffs=await userService.countStaffs();
        return res.status(SUCCESS).send({
            staffs:staffs.map(staff=>({
                ...staff._doc,
                createdAt:formatDate(staff.createdAt),
            })),
            totalStaffs,
        });
    }
    catch(e){
        console.log(e);
        return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal Server Error"});
    }
};

const getStaffProperties=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!await userService.isUserExistById(id)){
            return res.status(BAD_REQUEST).json({message:"Staff account does not exist"});
        }
        const staffProperties=await staffService.getStaffProperties(id);
        return res.status(SUCCESS).send(staffProperties);
    }
    catch(e){
        console.log(e);
        return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal Server Error"});
    }
};

const createStaffAccount=async(req,res)=>{
    try{
        if(isMissingAccountFields(req)){
            return res.status(BAD_REQUEST).json({
                message:"Please provide fullname, username and email"});
        }
        if(isMissingStaffProperties(req)){
            return res.status(BAD_REQUEST).json({
                message:"Please provide salary, phone and address"});
        }
        if(await userService.checkIfUserExistsByEmail(req.body.email)){
            return res.status(BAD_REQUEST).json({message:"Email already exists"});
        }
        if(await userService.checkIfUserExistsByUserName(req.body.userName)){
            return res.status(BAD_REQUEST).json({message:"Username already exists"});
        }
        const {fullName,userName,email}=req.body;
        const staffData=fullfillAccountSchema(fullName,userName,email);
        const staff=await userService.createUser(staffData);
        const createdStaff=await userService.saveUser(staff);
        const staffProperties=await staffService.createStaffProperties(createdStaff._id,req.body.staffProperties);
        await staffService.saveStaffProperties(staffProperties);
        return res.status(SUCCESS).json({message:"Staff account created successfully"});
    }
    catch(e){
        console.log(e);
        return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal Server Error"});
    }
};

const deleteStaffAccount=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!await userService.isUserExistById(id)){
            return res.status(BAD_REQUEST).json({message:"Staff account does not exist"});
        }
        await userService.deleteUserByID(id);
        await staffService.deleteStaffProperties(id);
        return res.status(SUCCESS).send({
            _id: id,
            message: "Staff account deleted successfully",
        })
    }
    catch(e){
        console.log(e);
        return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal Server Error"});
    }
};

const updateStaffProperties=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!await userService.isUserExistById(id)){
            return res.status(BAD_REQUEST).json({message:"Staff account does not exist"});
        }
        const {staffProperties}=req.body;
        const updatedStaff=await staffService.updateStaffProperties(id,staffProperties);
        return res.status(SUCCESS).send(updatedStaff);
    }
    catch(e){
        console.log(e);
        return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal Server Error"});
    }
}

export {createStaffAccount,deleteStaffAccount,getAllStaffs,getStaffProperties,updateStaffProperties};