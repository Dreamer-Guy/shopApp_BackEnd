
import 
{createStaffAccount,deleteStaffAccount,getAllStaffs,getStaffProperties,updateStaffProperties}
from "../../controllers/admin-controllers/staffController.js";
import express from "express";

const router=express.Router();

router.get("/all",getAllStaffs);
router.get("/staff-properties/:id",getStaffProperties);
router.post("/create",createStaffAccount);
router.put("/update-salary/:id",updateStaffProperties);
router.delete("/delete/:id",deleteStaffAccount);

export default router;