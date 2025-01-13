import adminCategoryController from "../../controllers/admin-controllers/categoryController.js";
import upload from "../../config/multer.js";
import express from "express";

const router=express.Router();

router.post('/add',upload.single("image"),adminCategoryController.addCategory);
router.put('/update/:id',upload.single("image"),adminCategoryController.updateCategory);
router.delete('/delete/:id',adminCategoryController.deleteCategory);
router.get('/all',adminCategoryController.getAllCategories);
router.get('/get/:id',adminCategoryController.getCategoryById);

export default router;