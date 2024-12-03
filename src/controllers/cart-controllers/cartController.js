
import cartServices from "../../services/cartService.js"
import checkNumber from "../../utils/checkNumber.js";
const SUCCESS_STATUS = process.env.SUCCESS_STATUS;
const BAD_REQUEST_STATUS = process.env.BAD_REQUEST_STATUS;
const SERVER_ERROR_STATUS = process.env.SERVER_ERROR_STATUS;
const isCartItemsValid=(req)=>{
  const {userId,productId,quantity}=req.body;
  if(!userId||!productId||!quantity){
      return false;
  }
  if(!checkNumber.isPositiveInteger(quantity)){
      return false;
  }
  return true;
};

const addToCart=async(req,res)=>{
 try{
    if(!isCartItemsValid(req)){
      return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
    }
    const {userId,productId,quantity}=req.body
    const {success,data}=await cartServices.createCart(userId,productId,quantity)
    if(!success){
      return res.status(SERVER_ERROR_STATUS).send({success:false,message:data})
    }
    return res.status(SUCCESS_STATUS).json(data)
 }
 catch(error){
   return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
 }
}
const removeFromCart=async(req,res)=>{
try{
      const {userId,productId,quantity}=req.body
      if(!userId||!productId||!quantity)
      {
        return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
      }
      const {success,data} = await cartServices.deleteItemFromCart(userId,productId,quantity)
      if(!success){
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:data})
      }
        return res.status(SUCCESS_STATUS).json(data)
}
catch(error){
   return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
}
}
const getCart=async(req,res)=>{
  try{
   const userId=req.params.id
   if(!userId)
   {
    return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
   }
   const {success,data} =await cartServices.getCartByUserId(userId)
   if(!success){
    return res.status(BAD_REQUEST_STATUS).send({success:false,message:data})
   }
   return res.status(SUCCESS_STATUS).json(data)
  }
  catch(error){
   return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
  }
}
export {addToCart,removeFromCart,getCart}