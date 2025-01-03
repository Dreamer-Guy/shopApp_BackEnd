import userServices from "../../services/userService.js";
const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;

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
        const userUpdate = await userServices.updateUserByID(user._id,{fullName,email});
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
export {updateUserProfile};
