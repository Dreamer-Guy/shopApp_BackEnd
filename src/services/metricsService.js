import userServices from "./userService.js";
import orderService from "./orderService.js";
import staffService from "./staffService.js";

const getTimeRangeThisMonth=()=>{
    const current=new Date();
    //console.log(current.getFullYear(),current.getMonth()+1,current.getDate());
    const start=new Date(current.getFullYear(),current.getMonth(),1);
    const end=new Date(current.getFullYear(),current.getMonth()+1,current.getDate());
    return {start,end};
}


const metricsService={
    getTotalNewCustomersInThisMonth:async()=>{
        const timeRange=getTimeRangeThisMonth();
        const totalNewCustomers=await userServices.countCustomersInTimeRange(timeRange);
        return totalNewCustomers;
    },
    getTotalOrdersInThisMonth:async()=>{
        const timeRange=getTimeRangeThisMonth();
        console.log(timeRange);
        const totalOrders=await orderService.countOrdersInTimeRange(timeRange);
        return totalOrders;
    },
    getTotalRevenueInThisMonth:async()=>{
        const timeRange=getTimeRangeThisMonth();
        const totalRevenue=await orderService.calculateTotalRevenueInTimeRange(timeRange);
        return totalRevenue;
    },
    getTotalReturningCustomersInThisMonth:async()=>{
        const timeRange=getTimeRangeThisMonth();
        const totalReturningCustomers=await userServices.countReturningCustomersInTimeRange(timeRange);
        return totalReturningCustomers
    },
    getTotalStaffSalaryThisMonth:async()=>{
        const totalSalary=await staffService.calculateTotalSalary();
        return totalSalary;
    },
    getTotalPurchasedItemsThisMonth:async()=>{
        const timeRange=getTimeRangeThisMonth();
        const totalPurchasedItems=await orderService.countPurchasedProductsInTimeRange(timeRange);
        return totalPurchasedItems;
    },
    getTotalCostMakingProductsThisMonth:async()=>{
        const timeRange=getTimeRangeThisMonth();
        const totalCost=await orderService.calculateTotalCostInTimeRange(timeRange);
        return totalCost;
    },
    getProfitThisMonth:async()=>{
        const totalRevenue=await metricsService.getTotalRevenueInThisMonth();
        const totalSalary=await metricsService.getTotalStaffSalaryThisMonth();
        const costToMakingProducts=await metricsService.getTotalCostMakingProductsThisMonth();
        const profit=totalRevenue-totalSalary;
        return profit;
    },

};
export default metricsService;