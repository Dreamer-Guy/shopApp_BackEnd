import orderService from "../../../services/orderService.js";
import addressService from "../../../services/addressService.js";
import cartService from "../../../services/cartService.js";
const SUCCESS_STATUS = process.env.SUCCESS_STATUS;
const BAD_REQUEST_STATUS = process.env.BAD_REQUEST_STATUS;
const SERVER_ERROR_STATUS = process.env.SERVER_ERROR_STATUS;



const placeOrder = async (req,res)=>{
    try{
        const userId =req.user._id
        if(!userId){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalidssss request"})
        }
        const address = await addressService.getAddressByUserId(userId);
        if(!address){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Address not found"})
        }
        const addressFormatted ={
            street:address.street,
            city:address.city,
            postalCode:address.postalCode,
            phone:address.phone,
            notes:address.notes
        }
        const {items} =req.body;
        const invalidProductIds =await orderService.getInvalidItemsOfCart(items);

        if(invalidProductIds.length>0){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Products not exits",invalidProductIds})
        }
        for (let item of items) {
            const { success, data } = await cartService.deleteItemFromCart(userId, item.productId, item.quantity);
            if(!success){
                console.log(data)
                return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Can not remove item from cart"})
            }
        }
        const order =await orderService.createOrder(userId,items,addressFormatted)
        console.log(order)
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
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        if(!userId){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
        }
        const data = await orderService.getOrderByUserId({userId,page,limit})
        return res.status(SUCCESS_STATUS).json({success:true,...data})
    }
    catch{
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
    }
};
const getOrderDetailsById=async(req,res)=>{
    try{
        const orderId = req.params.id
        console.log(orderId)
        if(!orderId){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
        }
        const order = await orderService.getOrderDetailsById(orderId)
        return res.status(SUCCESS_STATUS).json(order)
    }
    catch{
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
    }
}
export{placeOrder,
    updateStatusOrder,
    updatePaymentStatusOrder,
    updateOrder,
    deleteOrderById,
    getOrderByUserId,
    getOrderDetailsById};