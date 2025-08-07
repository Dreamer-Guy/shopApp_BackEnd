import adminCategoryController from "../../controllers/admin-controllers/categoryController.js";
import upload from "../../config/multer.js";
import express from "express";
import adminVerify from "../../middlewares/adminVerify.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";
const router=express.Router();

router.post('/add',verifyUserJWT,adminVerify,upload.single("image"),adminCategoryController.addCategory);
router.put('/update/:id',verifyUserJWT,adminVerify,upload.single("image"),adminCategoryController.updateCategory);
router.delete('/delete/:id',verifyUserJWT,adminVerify,adminCategoryController.deleteCategory);
router.get('/all',verifyUserJWT,adminVerify,adminCategoryController.getAllCategories);
router.get('/get/:id',verifyUserJWT,adminVerify,adminCategoryController.getCategoryById);

export default router;