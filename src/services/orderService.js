import Order from "../models/Order.js"
import Product from "../models/Product.js"

const calculateTotalAmount = async(items)=>{
    const prodcutIds =items.map(item=>item.productId)
    const products =await Product.find({'_id':{$in:prodcutIds}})
    let totalAmount =0
    items.forEach(item=>{

        const product = products.find(p=>p._id.toString()===item.productId.toString())
        if(product){
            const price =product.price
            const salePrice =product.salePrice
            const quantity =item.quantity
            if(salePrice){
                totalAmount += salePrice*quantity
            }
            else{
                totalAmount+=price*quantity
            }
        }
    }
    )
    return totalAmount
}
const orderService={
    async validateItems(items){
        const productIds = items.map(item => item.productId)
        const products = await Product.find({'_id':{$in:productIds}})
        if(products.length!=items.length){
            const inValidProducts = items.filter(item =>!products.some(product => product._id.toString()===item.productId.toString()))
            return inValidProducts
        }
        return true
    },
    async createOrder(userId,items){
        const total = await calculateTotalAmount(items)
        const order = new Order({userId:userId,items:items,total:total})
        await order.save()
        return order
    },
    async updateStatusOrder(orderId,status){
        const order = await Order.findByIdAndUpdate(orderId,{status:status},{new:true})
        if(!order){
            return({sucees:false,data:"Can not found order"})
        }
        return ({success:true,data:order})
    },
    async updatePaymentStatusOrder(orderId,paymentStatus){
        const order = await Order.findByIdAndUpdate(orderId,{paymentStatus:paymentStatus},{new:true})
        if(!order){
            return({success:false,data:"Can not found order"})
        }
        return ({success:true,data:order})
    },
    async deleteOrderById(orderId){
        const checkOrder =await Order.findById(orderId)
        if(checkOrder.status==="shipping"){
            return ({success:false,data:"Order being shipped"})
        }
        if(checkOrder.paymentStatus===true){
            return ({success:false,data:"Order has been paid"})
        }
        const order = await Order.findByIdAndDelete(orderId)
        if(!order){
            return ({success:false,data:"Can not found order"})
        }
        return ({success:true,data:order})
    },
    async updateOrder(orderId,userId,items){
        const order = await Order.findById(orderId)
        if(!order){
            return ({success:false,data:"Can not found order"})
        }
        if(order.status==="shipping"){
            return ({success:false,data:"Order being shipped"})
        }
        if(order.paymentStatus===true){
            return ({success:false,data:"Order has been paid"})
        }
        const total = await calculateTotalAmount(items)
        order.userId = userId
        order.items =items
        order.total=total
        const updateOrder= await order.save()
        return ({success:true,data:updateOrder})
    },
    async getOrderByUserId(userId){
        const orders = await Order.find({userId:userId})
        return orders
    }
}
export default orderService