import express from "express"
import { addToCart,removeFromCart,getCart ,updateCart,deleteCart} 
from "../../controllers/shop-controllers/cart-controllers/cartController.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";
const cartRoute=express.Router()
cartRoute.post("/add",verifyUserJWT,addToCart);
cartRoute.delete("/delete/:productId",verifyUserJWT,removeFromCart);
cartRoute.delete("/delete-cart",verifyUserJWT,deleteCart);
cartRoute.post("/get",verifyUserJWT,getCart);
cartRoute.put("/update",verifyUserJWT,updateCart);

export default cartRoute
