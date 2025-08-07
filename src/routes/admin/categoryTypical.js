import {getAllTypicalDetails,addTypicalDetail,deleteTypicalDetail} from "../../controllers/admin-controllers/categoryTypicalController.js";
import adminVerify from "../../middlewares/adminVerify.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";
import express from "express";

const router=express.Router();

router.get('/all/:id',verifyUserJWT,adminVerify,getAllTypicalDetails);
router.post('/add',verifyUserJWT,adminVerify,addTypicalDetail);
router.delete('/delete/:id',verifyUserJWT,adminVerify,deleteTypicalDetail);

export default router;