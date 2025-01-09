
import orderController from "../../controllers/admin-controllers/orderController.js";
import express from "express";
const router = express.Router();

router.get("/all",orderController.getAllOrders);
router.get("/recent",orderController.getRecentOrders);
router.get("/revenue-total",orderController.getTotalRevenue);
router.get("/count-total",orderController.getTotalOrders);
router.get("/:id",orderController.getOrderById);
router.put("/:id",orderController.updateStatusForOrder);

export default router;