const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;
import staffService from "../../services/staffService.js";
import uploadImageToCloud from "../../utils/uploadImageToCloud.js";
import deleteImageFromDiskSync from "../../utils/deleteImageFromDisk.js";
import userServices from "../../services/userService.js";
const upLoadAvatar= async(req)=>{
    const image = await uploadImageToCloud(req.file.path);
    deleteImageFromDiskSync(req.file.path);
    return image;
}
const getStaffProperties = async(req,res)=>{
   try{
    const staffProperties = await staffService.getStaffProperties(req.user._id)
    return res.status(SUCCESS_STATUS).json({success:true,staffProperties})
   }
   catch(error){
    return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
   }
}
const updateStaffProfile = async(req,res)=>{
    try{
    const {fullName,email,phone,address} = req.body
    let updateData = {fullName,email};
    if(req.file){
        const image=await upLoadAvatar(req);
        updateData.avatar=image;
    }
    const user = await userServices.updateUserByID(req.user._id,updateData);
    const staffNewProperties = await staffService.updateStaffProperties(req.user._id,{phone,address})
    if(!user||!staffNewProperties){
        return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Failed to update staff properties"})
    }
    return res.status(SUCCESS_STATUS).send({success:true,staffProperties:staffNewProperties,user})
}
    catch(error){
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
    }
}
export {getStaffProperties,updateStaffProfile}
