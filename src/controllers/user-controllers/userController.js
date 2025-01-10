import userServices from "../../services/userService.js";
import uploadImageToCloud from "../../utils/uploadImageToCloud.js";
import deleteImageFromDiskSync from "../../utils/deleteImageFromDisk.js";
const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;
const upLoadAvatar= async(req)=>{
    const image = await uploadImageToCloud(req.file.path);
    deleteImageFromDiskSync(req.file.path);
    return image;
}
const updateUserProfile=async(req,res)=>{
    try{
        const user=req.user;
        if(!user||!user._id){
            return res.status(BAD_REQUEST_STATUS).send({
                status: "error",
                message: "Invalid token",
            });
        }
        const {fullName,email}=req.body;
        let updateData = {fullName,email};;
        if(req.file){
            const image=await upLoadAvatar(req);
            updateData.avatar=image;
        }
        const userUpdate = await userServices.updateUserByID(user._id,updateData);
        return res.status(SUCCESS_STATUS).send({
            status: "success",
            message: "profile updated",
            user:userUpdate,
        });
    }
    catch(e){
        return res.status(SERVER_ERROR_STATUS).send({
            status: "error",
            message: "server err",
        });
    }
}
const changePassword=async(req,res)=>{
    try{

            const user=req.user;
            if(!user||!user._id){
                return res.status(BAD_REQUEST_STATUS).send({
                    success:false,
                    message: "Unauthorized",
                });
            }
            const {oldPassword,newPassword}=req.body;
            const {success,message}=await userServices.changePassword(user._id,oldPassword,newPassword);
            if(!success){
                return res.status(BAD_REQUEST_STATUS).send({
                    success:false,
                    message:message,
                });
            }
            return res.status(SUCCESS_STATUS).send({
                success:true,
                message:message,
            });
    }
    catch(e){
        return res.status(SERVER_ERROR_STATUS).send({
            success:false,
            message: "Server error",
        });
    }
}
export {updateUserProfile,changePassword};
