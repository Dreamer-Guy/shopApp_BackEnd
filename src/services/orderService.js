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
    return totalAmount;
}

const buildQueryFilterStatusAndPayment=(status,paymentStatus)=>{
    const query={};
    if(status){
        query.status=status;
    }
    if(paymentStatus){
        query.paymentStatus=paymentStatus;
    }
    return query;
};

const formatSortQuery=(sort)=>{
    const formatedSortOQuery={};
    for(const key in sort){
        formatedSortOQuery[key]=parseInt(sort[key]);
    }
    return formatedSortOQuery;
};

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
    async createOrder(userId,items,address){ 
        const total = await calculateTotalAmount(items);
        const itemsFromDb = await Product.find({_id:{$in:items.map(item=>item.productId)}})
        const itemsFormatted = items.map(item=>({
            name:itemsFromDb.find(product=>product._id.toString()===item.productId.toString()).name,
            cost:itemsFromDb.find(product=>product._id.toString()===item.productId.toString()).cost,
            image:itemsFromDb.find(product=>product._id.toString()===item.productId.toString()).image,
            price:itemsFromDb.find(product=>product._id.toString()===item.productId.toString()).price,
            quantity:item.quantity
        }))
        const order = new Order({userId:userId,items:itemsFormatted,total:total,address:address});
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
    async getOrderByUserId({userId,page,limit}){
        const totalOrders=await Order.countDocuments({userId:userId});
        const orders = await Order.find({userId:userId})
        .skip((page-1)*limit)
        .limit(limit)
        .lean();
        return {orders,totalPages:Math.ceil(totalOrders/limit)}
    },

    async getOrders(){
        const orders= await Order.find().lean();
        return orders;
    },

    async getOrdersFromGivenTimeRange(timeRange){
        const orders= await Order.find({
            createdAt:{
                $gte:timeRange.start,
                $lte:timeRange.end
            }
        });
        // const orders=mockOrders.filter(order=>{
        //     const orderDate = new Date(order.createdAt)
        //     if(orderDate>=timeRange.start && orderDate<=timeRange.end){
        //         return true;
        //     }
        //     return false;
        // })
        return orders;
    },

    getOrdersFilterStatusAndPayment:async(status,paymentStatus,sort,page,limit)=>{
        const formatedSortOQuery=formatSortQuery(sort);
        const query=buildQueryFilterStatusAndPayment(status,paymentStatus);
        const orders=await Order
            .find(query).sort(formatedSortOQuery)
            .skip((page-1)*limit)
            .limit(limit)
            .lean();
        return orders;
    },
    countOrdersFilterStatusAndPayment:async(status,paymentStatus)=>{
        const query=buildQueryFilterStatusAndPayment(status,paymentStatus);
        const count=await Order.countDocuments(query);
        return count;
    },
    updateStatusForOrder:async(orderId,status,paymentStatus)=>{
        const updatedOrder=await Order.findByIdAndUpdate(orderId,{status:status,paymentStatus:paymentStatus},{new:true});
        return updatedOrder;
    },
    getOrderById:async(orderId)=>{
        const order=await Order.findById(orderId)
        .populate('userId')
        .lean();
        return order;
    },
    getRecentOrders:async(limit)=>{
        const orders=await Order.find()
        .sort({createdAt:-1}).limit(limit)
        .populate('userId')
        .lean();
        return orders;
    },
    getTotalRevenue:async()=>{
        const orders=await Order.find();
        const totalRevenue=orders.reduce((acc,order)=>acc+order.total,0);
        return totalRevenue;
    },
    getTotalOrders:async()=>{
        const totalOrders=await Order.countDocuments();
        return totalOrders;
    },
    countOrdersInTimeRange:async(timeRange)=>{
        return await Order.countDocuments({
            createdAt:{
                $gte:timeRange.start,
                $lte:timeRange.end
            }
        });
    },

    calculateTotalRevenueInTimeRange:async(timeRange)=>{
        const orders=await orderService.getOrdersFromGivenTimeRange(timeRange);
        const totalRevenue=orders.reduce((acc,order)=>acc+order.total,0);
        return totalRevenue;
    },
    countPurchasedProductsInTimeRange:async(timeRange)=>{
        const orders=await orderService.getOrdersFromGivenTimeRange(timeRange);
        const totalPurchased=orders.reduce((acc,order)=>{
            const totalPurchasedInAnOrder=order.items.reduce((acc,item)=>acc+item.quantity,0);
            return acc+totalPurchasedInAnOrder;
        },0);
        return totalPurchased;
    },
    getOrderDetailsById:async(orderId)=>{
        const order=await Order.findById(orderId)
        console.log(order)
        return order;
    },
    calculateTotalCostInTimeRange:async(timeRange)=>{
        const orders=await orderService.getOrdersFromGivenTimeRange(timeRange);
        const totalCost=orders.reduce((acc,order)=>{
            const totalCostInAnOrder=order.items.reduce(async(acc,item)=>{
                const product=await Product.findById(item.productId);
                return acc+product.cost*item.quantity;
            },0);
            return acc+totalCostInAnOrder;
        },0);
        return totalCost;
    },

}
export default orderService;