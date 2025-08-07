import revenueController from "../../controllers/admin-controllers/revenueController.js";
import express from "express";
import adminVerify from "../../middlewares/adminVerify.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";

const router = express.Router();

router.get("/orders-year", verifyUserJWT,adminVerify,revenueController.getRevenueByYear);
router.get("/orders-month", verifyUserJWT,adminVerify,revenueController.getRevenueByMonth);
router.get("/orders-day", verifyUserJWT,adminVerify,revenueController.getRevenueByDay);
router.get("/metrics-year", verifyUserJWT,adminVerify,revenueController.getMetricsByYear);
router.get("/metrics-month", verifyUserJWT,adminVerify,revenueController.getMetricsByMonth);
router.get("/metrics-day", verifyUserJWT,adminVerify,revenueController.getMetricsByDay);
export default router;