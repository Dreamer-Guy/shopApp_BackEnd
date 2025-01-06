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
    }
    
}
export default orderService;