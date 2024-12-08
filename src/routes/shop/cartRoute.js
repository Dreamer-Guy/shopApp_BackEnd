import express from "express"
import { addToCart,removeFromCart,getCart ,updateCart} 
from "../../controllers/shop-controllers/cart-controllers/cartController.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";
const cartRoute=express.Router()
cartRoute.post("/add",verifyUserJWT,addToCart);
cartRoute.post("/delete/:productId",verifyUserJWT,removeFromCart);
cartRoute.post("/get",verifyUserJWT,getCart);
cartRoute.put("/update",verifyUserJWT,updateCart);

export default cartRoute
