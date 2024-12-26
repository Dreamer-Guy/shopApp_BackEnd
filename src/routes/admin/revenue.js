import 
{getRevenueByYear,getRevenueByMonth,getRevenueByDay}
from "../../controllers/admin-controllers/revenueController.js";
import express from "express";

const router = express.Router();

router.get("/year", getRevenueByYear);
router.get("/month", getRevenueByMonth);
router.get("/day", getRevenueByDay);

export default router;