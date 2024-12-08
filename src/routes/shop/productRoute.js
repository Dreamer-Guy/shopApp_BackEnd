import { searchProducts,getRelatedProducts}
from "../../controllers/shop-controllers/product-controllers.js/productController.js";
import express from "express";

const productRouter=express.Router();

productRouter.get("/get",searchProducts);
productRouter.get("/related/:productId",getRelatedProducts);

export default productRouter;