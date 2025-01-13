import adminBrandController from "../../controllers/admin-controllers/brandController.js";
import upload from "../../config/multer.js";
import express from "express";

const router=express.Router();

router.get('/all',adminBrandController.getAllBrands);
router.post('/add',upload.single("image"),adminBrandController.addBrand);
router.put('/update/:id',upload.single("image"),adminBrandController.updateBrand);
router.delete('/:id',adminBrandController.deleteBrand);
export default router;