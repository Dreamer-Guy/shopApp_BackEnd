import customerController from "../../controllers/admin-controllers/customerController.js";
import express from "express";

const router = express.Router();

router.get("/all", customerController.getAllCustomers);
router.post("/ban/:id",customerController.banAccount);
router.post("/unban/:id",customerController.unbanAccount);
router.get("/count-total",customerController.getTotalCustomers);

export default router;