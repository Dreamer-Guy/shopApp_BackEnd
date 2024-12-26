import orderService from "../../services/orderService.js";

const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;

const DEFAULT_TIME_RANGE=3;

const DAYS_IN_MONTH=[31,28,31,30,31,30,31,31,30,31,30,31];

const synchronizeDaysInMonth=(year)=>{
    const isLeapYear=(year%4===0 && year%100!==0) || year%400===0;
    if(isLeapYear){
        DAYS_IN_MONTH[1]=29;
        return;
    }
};

const isTimeOutOfRange=(orderTime,timeRange)=>{
    return orderTime<timeRange.start || orderTime>timeRange.end;
};

const calculateEndTimeCaseYear=(start,length)=>{
    const maxYearisCurrentYear=(start.year+length-1===new Date().getFullYear());
    if(maxYearisCurrentYear){
        return new Date();
    }
    return new Date(start.year+length-1,11,31);
};

const fullfillMissingTimeCaseYear=(revenueReport,year,length)=>{
    const isfullfilled=(Object.keys(revenueReport).length===length);
    if(isfullfilled){
        return {...revenueReport};
    }
    const newRevenueReport={...revenueReport};
    const timeRange=Array.from({length:length},(_,index)=>index+year).map((year)=>year.toString());
    timeRange.forEach((year)=>{
        if(!newRevenueReport[year]){
            newRevenueReport[year]={total:0,count:0};
        }
    });
    return newRevenueReport;
};

const getRevenueReportByYear=(orders,year,length)=>{
    const revenueReport={};
    orders.forEach((order)=>{
        const orderYear=order.createdAt.getFullYear();
        if(isTimeOutOfRange(order.createdAt,{start:new Date(`${year}-01-01`),end:calculateEndTimeCaseYear({year:year},length)})){
            return;
        };
        if(!revenueReport[orderYear]){
            revenueReport[orderYear]={
                total:order.total,
                count:1,
            };
            return;
        }
        revenueReport[orderYear].total+=order.total;
        revenueReport[orderYear].count++;
    });
    const fullfilledReport=fullfillMissingTimeCaseYear(revenueReport,year,length);
    const revenueArr=Object.keys(fullfilledReport).map((key)=>({
        label:key,
        revenue:{
            total:fullfilledReport[key].total,
            count:fullfilledReport[key].count,
        }
    }));
    return revenueArr.sort((a, b) => a.label.localeCompare(b.label));
};

const calculateEndTimeCaseMonth=(start,length)=>{
    const MAX_MONTH=11;
    const currentDate=new Date();
    const isEndTimeIsCurrentMonth=(start.month+length-1===currentDate.getMonth() && start.year===currentDate.getFullYear());
    if(isEndTimeIsCurrentMonth){
        return currentDate;
    };
    const isExceedYear=start.month+length-1>MAX_MONTH;
    if(!isExceedYear){
        return new Date(start.year,start.month+length-1,DAYS_IN_MONTH[start.month+length-1]);
    }
    return new Date(start.year+1,start.month+length-1-MAX_MONTH,DAYS_IN_MONTH[start.month+length-1-MAX_MONTH]);
};

const calculateNextTimeLineCaseMonth=(current)=>{
    //tech-debt-inconsistent-month-indexing
    const MAX_MONTH=12;
    const isExceedYear=current.month+1>MAX_MONTH;
    if(!isExceedYear){
        return {month:current.month+1,year:current.year};
    }
    return {month:1,year:current.year+1};
};

const getTimeRangeCaseMonth=(start,length)=>{
    const timeRange=[];
    let current={
        month:start.month+1,
        year:start.year,
    }
    for(let i=0;i<length;i++){
        timeRange.push({
            month:current.month,
            year:current.year,
        });
        current=calculateNextTimeLineCaseMonth(current);
    }
    return timeRange;
};

const fullfillMissingTimeCaseMonth=(revenueReport,start,length)=>{
    if(Object.keys(revenueReport).length===length){
        return {...revenueReport};
    }
    const newRevenueReport={...revenueReport};
    const timeRange=getTimeRangeCaseMonth(start,length);
    timeRange.forEach((time)=>{
        const key = `${time.year}-${String(time.month).padStart(2, '0')}`;
        if(!newRevenueReport[key]){
            newRevenueReport[key]={total:0,count:0};
        }
    });
    return newRevenueReport;
};

const getRevenueReportByMonth=(orders,start,length)=>{
    const revenueReport={};
    const validTimeRange={
        start:new Date(start.year,start.month,1),
        end:calculateEndTimeCaseMonth(start,length),
    }
    orders.forEach((order)=>{
        if(isTimeOutOfRange(order.createdAt,validTimeRange)){
            return;
        }
        const orderYear=order.createdAt.getFullYear();
        const orderMonth=order.createdAt.getMonth()+1;
        const key = `${orderYear}-${String(orderMonth).padStart(2, '0')}`;
        if(!revenueReport[key]){
            revenueReport[key]={
                total:order.total,
                count:1,
            };
            return;
        }
        revenueReport[key].total+=order.total;
        revenueReport[key].count++;
    });
    const fullfilledReport=fullfillMissingTimeCaseMonth(revenueReport,start,length);
    const revenueArr=Object.keys(fullfilledReport).map((key)=>({
        label:key,
        revenue:{
            total:fullfilledReport[key].total,
            count:fullfilledReport[key].count,
        }
    }));
    return revenueArr.sort((a, b) => a.label.toString().localeCompare(b.label));
};


const calculateEndTimeCaseDay=(start,length)=>{
    synchronizeDaysInMonth(start.year);
    const isExceedMonth=(start.day+length-1>DAYS_IN_MONTH[start.month]);
    if(!isExceedMonth){
        return new Date(start.year,start.month,start.day+length-1);
    }
    const isExceedYear=(start.month===11);
    if(!isExceedYear){
        return new Date(start.year,start.month+1,start.day+length-1-DAYS_IN_MONTH[start.month]);
    }
    return new Date(start.year+1,0,start.day+length-1-DAYS_IN_MONTH[start.month]);
};

const calculateNextTimeLineCaseDay=(current)=>{
    //tech-debt-inconsistent-month-indexing
    const MAX_MONTH=12;
    synchronizeDaysInMonth(current.year);
    const isExceedMonth=(current.day+1>DAYS_IN_MONTH[current.month-1]);
    if(!isExceedMonth){
        return {month:current.month,year:current.year,day:current.day+1};
    }
    const isExceedYear=(current.month===12);
    if(!isExceedYear){
        return {month:current.month+1,year:current.year,day:1};
    }
    return {month:1,year:current.year+1,day:1};
};

const getTimeRangeCaseDay=(start,length)=>{
    const timeRange=[];
    let current={
        day:start.day,
        month:start.month+1,
        year:start.year,
    }
    for(let i=0;i<length;i++){
        timeRange.push({
            day:current.day,
            month:current.month,
            year:current.year,
        });
        current=calculateNextTimeLineCaseDay(current);
    }
    return timeRange;
};

const fullfillMissingTimeCaseDay=(revenueReport,start,length)=>{
    synchronizeDaysInMonth(start.year);
    if(Object.keys(revenueReport).length===length){
        return {...revenueReport};
    }
    const newRevenueReport={...revenueReport};
    const timeRange=getTimeRangeCaseDay(start,length);
    timeRange.forEach((time)=>{
        const key = `${time.year}-${String(time.month).padStart(2, '0')}-${String(time.day).padStart(2, '0')}`;
        if(!newRevenueReport[key]){
            newRevenueReport[key]={total:0,count:0};
        }
    });
    return newRevenueReport;
}

const getRevenueReportByDay=(orders,start,length)=>{
    const revenueReport={};
    const validTimeRange={
        start:new Date(start.year,start.month,start.day),
        end:calculateEndTimeCaseDay(start,length),
    };
    orders.forEach((order)=>{
        if(isTimeOutOfRange(order.createdAt,validTimeRange)){
            return;
        }
        const orderYear=order.createdAt.getFullYear();
        const orderMonth=order.createdAt.getMonth()+1;
        const orderDay=order.createdAt.getDate();
        const key = `${orderYear}-${String(orderMonth).padStart(2, '0')}-${String(orderDay).padStart(2, '0')}`;
        if(!revenueReport[key]){
            revenueReport[key]={
                total:order.total,
                count:1,
            };
            return;
        }
        revenueReport[key].total+=order.total;
        revenueReport[key].count++;
    });
    const fullfilledReport=fullfillMissingTimeCaseDay(revenueReport,start,length);
    const revenueArr=Object.keys(fullfilledReport).map((key)=>({
        label:key,
        revenue:{
            total:fullfilledReport[key].total,
            count:fullfilledReport[key].count,
        }
    }));
    return revenueArr.sort((a, b) => a.label.toString().localeCompare(b.label));
};


const convertArrayofRevenueToLabel=(revenueArr)=>{
    return revenueArr.map((revenue)=>revenue.label);
};

const convertArrayofRevenueToRevenue=(revenueArr)=>{
    return revenueArr.map((revenue)=>revenue.revenue);
};


//controller

const getRevenueByYear=async(req,res)=>{
    try{
        const {year,length=DEFAULT_TIME_RANGE}=req.query;
        const timeRange={
            start:new Date(`${year}-01-01`),
            end:new Date(`${year+length-1}-01-01`),
        };
        const orders=await orderService.getOrdersFromGivenTimeRange(timeRange);
        const revenue=getRevenueReportByYear(orders,year,length);
        return res.send({
            label:convertArrayofRevenueToLabel(revenue),
            revenue:convertArrayofRevenueToRevenue(revenue),
        });
    }
    catch(e){
        console.log(e.message);
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"});
    }
};

const getRevenueByMonth=async(req,res)=>{
    try{
        //expect month is 0-indexed
        const {year,month,length=DEFAULT_TIME_RANGE}=req.query;
        const timeRange={
            start:new Date(year,month,1),
            end:calculateEndTimeCaseMonth({
                month:parseInt(month),year:parseInt(year)},length),
        };
        const orders=await orderService.getOrdersFromGivenTimeRange(timeRange);
        const startTime={
            month:parseInt(month),
            year:parseInt(year),
        };
        const revenue=getRevenueReportByMonth(orders,startTime,length);
        return res.send({
            label:convertArrayofRevenueToLabel(revenue),
            revenue:convertArrayofRevenueToRevenue(revenue),
        });
    }
    catch(e){
        console.log(e.message);
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"});
    }
}

const getRevenueByDay=async(req,res)=>{
    try{
        //expect month is 0-indexed
        const {year,month,day,length=DEFAULT_TIME_RANGE}=req.query;
        const timeRange={
            start:new Date(year,month,day),
            end:calculateEndTimeCaseDay({
                year:parseInt(year),month:parseInt(month),day:parseInt(day)},length),
        };
        const orders=await orderService.getOrdersFromGivenTimeRange(timeRange);
        const startTime={
            day:parseInt(day),
            month:parseInt(month),
            year:parseInt(year),
        };
        const revenue=getRevenueReportByDay(orders,startTime,length);
        return res.send({
            label:convertArrayofRevenueToLabel(revenue),
            revenue:convertArrayofRevenueToRevenue(revenue),
        });
    }
    catch(e){
        console.log(e.message);
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"});
    }
};


export {getRevenueByYear,getRevenueByMonth,getRevenueByDay};