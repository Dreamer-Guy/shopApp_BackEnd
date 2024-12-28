import Order from "../models/Order.js"
import Product from "../models/Product.js"

const mockOrders = [
    // Year 2022
    { total: 250, createdAt: new Date("2022-03-14") },
    { total: 480, createdAt: new Date("2022-06-21") },
    { total: 320, createdAt: new Date("2022-09-05") },
  
    // Year 2023
    { total: 150, createdAt: new Date("2023-01-18") },
    { total: 590, createdAt: new Date("2023-05-24") },
    { total: 410, createdAt: new Date("2023-08-11") },
  
    // Year 2024
    { total: 230, createdAt: new Date("2024-02-12") },
    { total: 670, createdAt: new Date("2024-04-19") },
    { total: 340, createdAt: new Date("2024-07-29") },
    { total: 760, createdAt: new Date("2024-09-07") },
  
    // Year 2024, months 10, 11, 12
    { total: 500, createdAt: new Date("2024-10-15") },
    { total: 620, createdAt: new Date("2024-11-09") },
    { total: 430, createdAt: new Date("2024-12-01") },
    { total: 800, createdAt: new Date("2024-12-13") },
  
    // Year 2024, days 26, 24, 25, month 12
    { total: 900, createdAt: new Date("2024-12-24") },
    { total: 750, createdAt: new Date("2024-12-25") },
    { total: 890, createdAt: new Date("2024-12-26") },
    { total: 940, createdAt: new Date("2024-12-26") },
  ];

  


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
    return totalAmount;
}


const orderService={
    async getInvalidItemsOfCart(items){
        const productIds = items.map(item => item.productId)
        const existingProducts = await Product.find({'_id':{$in:productIds}})
        if(existingProducts.length!=items.length){
            const inValidProducts = items.filter(
                item =>!existingProducts.some(
                    product => product._id.toString()===item.productId.toString() && product.isDeleted===false))
            return inValidProducts;
        }
        return true;
    },
    async createOrder(userId,items){
        const total = await calculateTotalAmount(items);
        const order = new Order({userId:userId,items:items,total:total});
        await order.save();
        return order;
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
    },

    async getOrders(){
        const orders= await Order.find().lean();
        return orders;
    },

    async getOrdersFromGivenTimeRange(timeRange){
        // const orders= await Order.find({
        //     createdAt:{
        //         $and:[
        //             {$gte:timeRange.start},
        //             {$lte:timeRange.end}
        //         ]
        //     }
        // })
        const orders=mockOrders.filter(order=>{
            const orderDate = new Date(order.createdAt)
            if(orderDate>=timeRange.start && orderDate<=timeRange.end){
                return true;
            }
            return false;
        })
        return orders;
    }
}
export default orderService;