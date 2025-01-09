import productController from "../../controllers/admin-controllers/productController.js";

import express from "express";
import adminVerify from "../../middlewares/adminVerify.js";
import upload from "../../config/multer.js";

const adminProductRouter=express.Router();

adminProductRouter.get("/all",productController.getAllProducts);
adminProductRouter.get("/soft-deleted",productController.getSoftDeletedProducts);
adminProductRouter.get("/get/:id",productController.getProductById);
adminProductRouter.post("/add",upload.single("image"),productController.addProduct);
adminProductRouter.delete("/delete/:id",productController.deleteProductById);
adminProductRouter.delete("/soft-delete/:id",productController.softDeleteProductById);
adminProductRouter.post("/restore/:id",productController.restoreSoftDeletedProductById);
adminProductRouter.put("/update/:id",upload.single("image"),productController.updateByProductId);
adminProductRouter.get("/count-total",productController.getTotalProducts);
adminProductRouter.get("/top-sales",productController.getTopSalesProducts);
adminProductRouter.get("/total-sales",productController.getTotalSales);
export default adminProductRouter;