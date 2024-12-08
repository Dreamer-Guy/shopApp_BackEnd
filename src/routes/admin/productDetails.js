import 
{getProductDetailsByProductId,addProductDetails,
updateProductDetailsByProductId,deleteProductDetailsByProductId}
from "../../controllers/admin-controllers/productDetailsController.js";

import express from "express";


const adminProductDetailsRouter=express.Router();

adminProductDetailsRouter.get("/get/:id",getProductDetailsByProductId);
adminProductDetailsRouter.post("/add",addProductDetails);
adminProductDetailsRouter.put("/update/:id",updateProductDetailsByProductId);
adminProductDetailsRouter.delete("/delete/:id",deleteProductDetailsByProductId);

export default adminProductDetailsRouter;