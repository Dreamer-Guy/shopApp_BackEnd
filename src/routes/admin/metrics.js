import metricsController from "../../controllers/admin-controllers/metricsController.js";
import express from "express";

const router = express.Router();

router.get("/total-orders", metricsController.getTotalOrders);
router.get("/total-purchased-items", metricsController.getTotalPurchasedItems);
router.get("/total-revenue", metricsController.getTotalRevenue);
router.get("/profit", metricsController.getProfit);
router.get("/total-new-customers", metricsController.getTotalNewCustomers);
router.get("/total-returning-customers", metricsController.getTotalReturningCustomers);
router.get("/total-staff-salary", metricsController.getTotalStaffSalary);


export default router;