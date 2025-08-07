import adminBrandController from "../../controllers/admin-controllers/brandController.js";
import upload from "../../config/multer.js";
import express from "express";
import adminVerify from "../../middlewares/adminVerify.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";
const router=express.Router();

router.get('/all',verifyUserJWT,adminVerify,adminBrandController.getAllBrands);
router.post('/add',verifyUserJWT,adminVerify,upload.single("image"),adminBrandController.addBrand);
router.put('/update/:id',verifyUserJWT,adminVerify,upload.single("image"),adminBrandController.updateBrand);
router.delete('/:id',verifyUserJWT,adminVerify,adminBrandController.deleteBrand);
export default router;