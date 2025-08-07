
import orderController from "../../controllers/admin-controllers/orderController.js";
import express from "express";
import adminVerify from "../../middlewares/adminVerify.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";
const router = express.Router();

router.get("/all",verifyUserJWT,adminVerify,orderController.getAllOrders);
router.get("/recent",verifyUserJWT,adminVerify,orderController.getRecentOrders);
router.get("/revenue-total",verifyUserJWT,adminVerify,orderController.getTotalRevenue);
router.get("/count-total",verifyUserJWT,adminVerify,orderController.getTotalOrders);
router.get("/:id",verifyUserJWT,adminVerify,orderController.getOrderById);
router.put("/:id",verifyUserJWT,adminVerify,orderController.updateStatusForOrder);

export default router;