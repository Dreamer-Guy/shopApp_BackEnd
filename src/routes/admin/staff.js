
import 
{createStaffAccount,deleteStaffAccount,getAllStaffs,getStaffProperties,updateStaffProperties}
from "../../controllers/admin-controllers/staffController.js";
import express from "express";
import adminVerify from "../../middlewares/adminVerify.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";

const router=express.Router();

router.get("/all",verifyUserJWT,adminVerify,getAllStaffs);
router.get("/staff-properties/:id",verifyUserJWT,adminVerify,getStaffProperties);
router.post("/create",verifyUserJWT,adminVerify,createStaffAccount);
router.put("/update-salary/:id",verifyUserJWT,adminVerify,updateStaffProperties);
router.delete("/delete/:id",verifyUserJWT,adminVerify,deleteStaffAccount);

export default router;