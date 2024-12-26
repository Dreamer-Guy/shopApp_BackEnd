import orderService from "../../../services/orderService.js";
import userService from "../../../services/userService.js";
import cartService from "../../../services/cartService.js";
const SUCCESS_STATUS = process.env.SUCCESS_STATUS;
const BAD_REQUEST_STATUS = process.env.BAD_REQUEST_STATUS;
const SERVER_ERROR_STATUS = process.env.SERVER_ERROR_STATUS;

const isOrderValid = async (req)=>{
    const {userId,items,isItemsInCart} =req.body;
    if(!userId||!items||items.length<0)
    {
        return false
    }
    const user = await userService.getUserByID(userId)
    if(!user)
    {
        return false
    }
    return true
};

const placeOrder = async (req,res)=>{
    try{
        if(!await isOrderValid(req)){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
        }
        const {userId,items } =req.body
        const invalidProductIds =await orderService.validateItems(items) 
        if(invalidProductIds!==true){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Products not exits",invalidProductIds})
        }
        for (const item of items) {
            const { success, data } = await cartService.deleteItemFromCart(userId, item.productId, item.quantity);
            if(!success){
                        return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Can not remove item from cart"})
            }
        }
        const order =await orderService.createOrder(userId,items)
        res.status(SUCCESS_STATUS).send({success:true,message:"Order successful"})
    }
    catch{
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
    }
};

const updateStatusOrder =async(req,res)=>
{
    try{

        const orderId =req.params.id
        const {status} =req.body
        if(!orderId||!status){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
        }
        const {success,data} =await orderService.updateStatusOrder(orderId,status)
        if(!success){
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:data})
        }
        return res.status(SUCCESS_STATUS).json(data)
    }
    catch{
    return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})

    }

};

const updatePaymentStatusOrder =async(req,res)=>
{
try{
    const orderId =req.params.id
    const {paymentStatus} =req.body
    if(!orderId||typeof paymentStatus!=='boolean'){
        return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
    }
    const {success,data} =await orderService.updatePaymentStatusOrder(orderId,paymentStatus)
    if(!success){
    return res.status(SERVER_ERROR_STATUS).send({success:false,message:data})
    }
    return res.status(SUCCESS_STATUS).json(data)
}
catch{
return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
}
}
const updateOrder =async(req,res)=>
{
    try{
        const orderId =req.params.id

        const {userId,items} =req.body

        if(!orderId||!userId||!items){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
        }

        const invalidProductIds =await orderService.validateItems(items) 

        if(invalidProductIds!==true){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Products not exits",invalidProductIds})
        }

        const {success,data} =await orderService.updateOrder(orderId,userId,items)
        if(!success){
            return res.status(SERVER_ERROR_STATUS).send({success:false,message:data})
        }
        return res.status(SUCCESS_STATUS).send({success:true,message:"Updated successfully"})
    }
    catch{
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
    }
};
const deleteOrderById = async(req,res)=>{
    try{
        const orderId =req.params.id
        if(!orderId)
        {
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
        }
        const {success,data}= await orderService.deleteOrderById(orderId)
        if(!success){
            return res.status(SERVER_ERROR_STATUS).send({success:false,message:data})
        }
        return res.status(SUCCESS_STATUS).send({success:true,message:"Deleted successfully"})
    }
    catch{
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
    }
};
const getOrderByUserId  = async (req,res)=>{
    try{
        const userId=req.params.id
        if(!userId){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
        }
        const orders = await orderService.getOrderByUserId(userId)
        return res.status(SUCCESS_STATUS).json({success:false,data:orders})
    }
    catch{
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
    }
};
export{
    placeOrder,updateStatusOrder,updatePaymentStatusOrder,updateOrder,deleteOrderById,getOrderByUserId};