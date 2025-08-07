import productController from "../../controllers/admin-controllers/productController.js";

import express from "express";
import adminVerify from "../../middlewares/adminVerify.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";
import upload from "../../config/multer.js";

const adminProductRouter=express.Router();

adminProductRouter.get("/all",verifyUserJWT,adminVerify,productController.getAllProducts);
adminProductRouter.get("/soft-deleted",verifyUserJWT,adminVerify,productController.getSoftDeletedProducts);
adminProductRouter.get("/get/:id",verifyUserJWT,adminVerify,productController.getProductById);
adminProductRouter.post("/add",verifyUserJWT,adminVerify,upload.single("image"),productController.addProduct);
adminProductRouter.delete("/delete/:id",verifyUserJWT,adminVerify,productController.deleteProductById);
adminProductRouter.delete("/soft-delete/:id",verifyUserJWT,adminVerify,productController.softDeleteProductById);
adminProductRouter.post("/restore/:id",verifyUserJWT,adminVerify,productController.restoreSoftDeletedProductById);
adminProductRouter.put("/update/:id",verifyUserJWT,adminVerify,upload.single("image"),productController.updateByProductId);
adminProductRouter.get("/count-total",verifyUserJWT,adminVerify,productController.getTotalProducts);
adminProductRouter.get("/top-sales",verifyUserJWT,adminVerify,productController.getTopSalesProducts);
adminProductRouter.get("/total-sales",verifyUserJWT,adminVerify,productController.getTotalSales);
export default adminProductRouter;