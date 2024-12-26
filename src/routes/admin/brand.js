import { addBrand,updateBrand,deleteBrand,getAllBrands } 
from "../../controllers/admin-controllers/brandController.js";
import upload from "../../config/multer.js";
import express from "express";

const router=express.Router();

router.get('/all',getAllBrands);
router.post('/add',upload.single("image"),addBrand);
router.put('/update/:id',upload.single("image"),updateBrand);
router.delete('/delete/:id',deleteBrand);
export default router;