import 
{getAllOrders,getOrderById,updateStatusForOrder}
from "../../controllers/admin-controllers/orderController.js";
import express from "express";
const router = express.Router();

router.get("/all",getAllOrders);
router.get("/:id",getOrderById);
router.put("/:id",updateStatusForOrder);

export default router;