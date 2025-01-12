import express from "express";
import upload from "../../config/multer.js";
const staffRouter = express.Router();
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";
import {getStaffProperties,updateStaffProfile} from "../../controllers/staff-controllers/staffController.js"
staffRouter.get("/getStaffProperties",verifyUserJWT,getStaffProperties)
staffRouter.put("/updateProfile",verifyUserJWT,upload.single("avatar"),updateStaffProfile)
export default staffRouter;
