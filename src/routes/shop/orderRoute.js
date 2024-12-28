import express from "express"
import verifyUserJWT from '../../middlewares/verifyUserJWT.js';
import {
    placeOrder,
    updateStatusOrder,
    updatePaymentStatusOrder,
    updateOrder,deleteOrderById,
    getOrderByUserId} 
    from "../../controllers/shop-controllers/order-controllers/orderController.js";

const orderRoute =express.Router()

orderRoute.post("/placeOrder",verifyUserJWT,placeOrder)

//role Staff/Admin có quyền cập nhật trạng thái đơn hàng
orderRoute.patch("/updateStatus/:id",verifyUserJWT,updateStatusOrder)

// Sau khi khách hàng thanh toán thành công mới thực hiện cập nhật payment
orderRoute.patch("/updatePaymentStatus/:id",verifyUserJWT,updatePaymentStatusOrder)

//role Staff/Admin mới có quyền cập nhật thông tin đơn hàng. 
//Trừ trường hợp đơn hàng đang giao/ giao thành công (chưa check giao thành công) / đã thanh toán
orderRoute.put("/:id",verifyUserJWT,updateOrder)

//Khách hàng hủy đặt hàng khi đơn hàng chưa trên đường giao hoặc chưa thanh toán.
orderRoute.delete("/cancel/:id",verifyUserJWT,deleteOrderById)

orderRoute.get("/:id",verifyUserJWT,getOrderByUserId)




export default orderRoute