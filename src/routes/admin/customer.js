import customerController from "../../controllers/admin-controllers/customerController.js";
import express from "express";
import adminVerify from "../../middlewares/adminVerify.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";
const router = express.Router();

router.get("/all", verifyUserJWT,adminVerify,customerController.getAllCustomers);
router.post("/ban/:id",verifyUserJWT,adminVerify,customerController.banAccount);
router.post("/unban/:id",verifyUserJWT,adminVerify,customerController.unbanAccount);
router.get("/count-total",verifyUserJWT,adminVerify,customerController.getTotalCustomers);

export default router;