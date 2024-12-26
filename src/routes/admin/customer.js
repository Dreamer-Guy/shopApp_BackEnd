import { getAllCustomers,banAccount,unbanAccount } 
from "../../controllers/admin-controllers/customerController.js";
import express from "express";

const router = express.Router();

router.get("/all", getAllCustomers);
router.get("/ban/:id",banAccount);
router.get("/unban/:id",unbanAccount);

export default router;