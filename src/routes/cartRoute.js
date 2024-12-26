import express from "express"
import { addToCart,removeFromCart,getCart } from "../controllers/cart-controllers/cartController.js";
import verifyUserJWT from "../middlewares/verifyUserJWT.js";

const cartRoute=express.Router()
cartRoute.post("/add",verifyUserJWT,addToCart)
cartRoute.post("/remove",verifyUserJWT,removeFromCart)
cartRoute.get("/:id",verifyUserJWT,getCart)
export default cartRoute
