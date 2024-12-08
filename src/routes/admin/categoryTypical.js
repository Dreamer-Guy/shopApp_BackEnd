import {getAllTypicalDetails,addTypicalDetail,deleteTypicalDetail} from "../../controllers/admin-controllers/categoryTypicalController.js";

import express from "express";

const router=express.Router();

router.get('/all/:id',getAllTypicalDetails);
router.post('/add',addTypicalDetail);
router.delete('/delete/:id',deleteTypicalDetail);

export default router;