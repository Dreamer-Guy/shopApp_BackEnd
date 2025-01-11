import metricsServie from "../../services/metricsService.js";

const OK_STATUS = 200;
const INTERNAL_SERVER_ERROR_STATUS = 500;
const BAD_REQUEST_STATUS = 400;

const metricsController={
    getTotalOrders: async (req, res) => {
        try {
            const totalOrders = await metricsServie.getTotalOrdersInThisMonth();
            return res.json(totalOrders);
        } 
        catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: error.message });
        }
    },
    getTotalPurchasedItems:async(req,res)=>{
        try {
            const totalPurchasedItems = await metricsServie.getTotalPurchasedItemsThisMonth();
            return res.json(totalPurchasedItems);
        } 
        catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: error.message });
        }
    },
    getTotalRevenue:async(req,res)=>{
        try {
            const totalRevenue = await metricsServie.getTotalRevenueInThisMonth();
            return res.json(totalRevenue);
        } 
        catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: error.message });
        }
    },
    getProfit:async(req,res)=>{
        try {
            const profit = await metricsServie.getProfitThisMonth();
            return res.json(profit);
        } 
        catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: error.message });
        }
    },
    getTotalNewCustomers:async(req,res)=>{
        try {
            const totalNewCustomers = await metricsServie.getTotalNewCustomersInThisMonth();
            return res.json(totalNewCustomers);
        } 
        catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: error.message });
        }
    },
    getTotalReturningCustomers:async(req,res)=>{
        try {
            const totalReturningCustomers = await metricsServie.getTotalReturningCustomersInThisMonth();
            return res.json(totalReturningCustomers);
        } 
        catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: error.message });
        }
    },
    getTotalStaffSalary:async(req,res)=>{
        try {
            
            const totalStaffSalary = await metricsServie.getTotalStaffSalaryThisMonth();
            return res.json(totalStaffSalary);
        } 
        catch (error) {
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: error.message });
        }
    },
};

export default metricsController;