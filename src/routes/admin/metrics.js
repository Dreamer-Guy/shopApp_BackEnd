import metricsController from "../../controllers/admin-controllers/metricsController.js";
import express from "express";
import adminVerify from "../../middlewares/adminVerify.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";
const router = express.Router();

router.get("/total-orders", verifyUserJWT,adminVerify,metricsController.getTotalOrders);
router.get("/total-purchased-items", verifyUserJWT,adminVerify,metricsController.getTotalPurchasedItems);
router.get("/total-revenue", verifyUserJWT,adminVerify,metricsController.getTotalRevenue);
router.get("/profit", verifyUserJWT,adminVerify,metricsController.getProfit);
router.get("/total-new-customers", verifyUserJWT,adminVerify,metricsController.getTotalNewCustomers);
router.get("/total-returning-customers", verifyUserJWT,adminVerify,metricsController.getTotalReturningCustomers);
router.get("/total-staff-salary", verifyUserJWT,adminVerify,metricsController.getTotalStaffSalary);


export default router;