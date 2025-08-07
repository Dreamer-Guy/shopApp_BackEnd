import 
{getProductDetailsByProductId,addProductDetails,
updateProductDetailsByProductId,deleteProductDetailsByProductId}
from "../../controllers/admin-controllers/productDetailsController.js";
import adminVerify from "../../middlewares/adminVerify.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";

import express from "express";


const adminProductDetailsRouter=express.Router();

adminProductDetailsRouter.get("/get/:id",verifyUserJWT,adminVerify,getProductDetailsByProductId);
adminProductDetailsRouter.post("/add",verifyUserJWT,adminVerify,addProductDetails);
adminProductDetailsRouter.put("/update/:id",verifyUserJWT,adminVerify,updateProductDetailsByProductId);
adminProductDetailsRouter.delete("/delete/:id",verifyUserJWT,adminVerify,deleteProductDetailsByProductId);

export default adminProductDetailsRouter;