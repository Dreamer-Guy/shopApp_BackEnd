import {getAllProducts,getProductById,addProduct,deleteProductById,updateByProductId}
from "../../controllers/admin-controllers/productController.js";

import express from "express";
import adminVerify from "../../middlewares/adminVerify.js";
import upload from "../../config/multer.js";

const adminProductRouter=express.Router();

adminProductRouter.get("/all",getAllProducts);
adminProductRouter.get("/get/:id",getProductById);
adminProductRouter.post("/add",upload.single("image"),addProduct);
adminProductRouter.delete("/delete/:id",deleteProductById);
adminProductRouter.put("/update/:id",upload.single("image"),updateByProductId);
export default adminProductRouter;