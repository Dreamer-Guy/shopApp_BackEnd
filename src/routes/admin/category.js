import { addCategory,updateCategory,deleteCategory,getAllCategories,getCategoryById } 
from "../../controllers/admin-controllers/categoryController.js";
import upload from "../../config/multer.js";
import express from "express";

const router=express.Router();

router.post('/add',upload.single("image"),addCategory);
router.put('/update/:id',upload.single("image"),updateCategory);
router.delete('/delete/:id',deleteCategory);
router.get('/all',getAllCategories);
router.get('/get/:id',getCategoryById);

export default router;