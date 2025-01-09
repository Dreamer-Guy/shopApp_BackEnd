import orderService from "../../services/orderService.js";

const INTERNAL_SERVER_ERROR=500;
const SUCCESS_STATUS=200;
const BAD_REQUEST_STATUS=400;

const orderController = {
    getAllOrders: async (req, res) => {
        try {
            const { status, paymentStatus, sort } = req.query;
            const { page, limit } = req.query;
            const orders = await orderService.getOrdersFilterStatusAndPayment(status, paymentStatus, sort, page, limit);
            const totalOrders = await orderService.countOrdersFilterStatusAndPayment(status, paymentStatus);
            return res.status(SUCCESS_STATUS).send({
                orders,
                totalOrders
            });
        } catch (e) {
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
        }
    },

    updateStatusForOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            const { status, paymentStatus } = req.body;
            if (!orderId || !status) {
                return res.status(BAD_REQUEST_STATUS).json({ message: "Invalid request" });
            }
            const updatedOrder = await orderService.updateStatusForOrder(orderId, status, paymentStatus);
            return res.status(SUCCESS_STATUS).send(updatedOrder);
        } catch (e) {
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const orderId = req.params.id;
            if (!orderId) {
                return res.status(BAD_REQUEST_STATUS).json({ message: "Invalid request" });
            }
            const order = await orderService.getOrderById(orderId);
            return res.status(SUCCESS_STATUS).send(order);
        } catch (e) {
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
        }
    },

    getRecentOrders: async (req, res) => {
        try {
            const { limit } = req.query;
            const orders = await orderService.getRecentOrders(limit);
            return res.status(SUCCESS_STATUS).send(orders);
        } catch (e) {
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
        }
    },

    getTotalOrders: async (req, res) => {
        try {
            const totalOrders = await orderService.getTotalOrders();
            return res.status(SUCCESS_STATUS).send(String(totalOrders));
        } catch (e) {
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
        }
    },

    getTotalRevenue: async (req, res) => {
        try {
            const totalRevenue = await orderService.getTotalRevenue();
            return res.status(SUCCESS_STATUS).send(String(totalRevenue));
        } catch (e) {
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
        }
    }
};

export default orderController;


