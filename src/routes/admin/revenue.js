import revenueController from "../../controllers/admin-controllers/revenueController.js";
import express from "express";

const router = express.Router();

router.get("/orders-year", revenueController.getRevenueByYear);
router.get("/orders-month", revenueController.getRevenueByMonth);
router.get("/orders-day", revenueController.getRevenueByDay);
router.get("/metrics-year", revenueController.getMetricsByYear);
router.get("/metrics-month", revenueController.getMetricsByMonth);
router.get("/metrics-day", revenueController.getMetricsByDay);
export default router;