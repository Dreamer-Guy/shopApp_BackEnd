
const DAYS_IN_MONTH=[31,28,31,30,31,30,31,31,30,31,30,31];

const isTimeOutOfRange=(orderTime,timeRange)=>{
    return orderTime<timeRange.start || orderTime>timeRange.end;
};
const synchronizeDaysInMonth=(year)=>{
    const isLeapYear=(year%4===0 && year%100!==0) || year%400===0;
    if(isLeapYear){
        DAYS_IN_MONTH[1]=29;
        return;
    }
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
    return revenueArr;
};



const mockOrders = [
    { total: 150.5, createdAt: new Date("2023-12-17") },
    { total: 200.0, createdAt: new Date("2023-12-18") },
    { total: 320.75, createdAt: new Date("2023-12-19") }, 
    { total: 180.25, createdAt: new Date("2023-12-19") },
    { total: 99.99, createdAt: new Date("2023-12-18") },
    { total: 250.45, createdAt: new Date("2023-12-17") }
  ];
  

    const string=[{str:"2023-10"},{str:"2023-09"},{str:"2023-11"}];
    string.sort((a, b) => a.str.localeCompare(b.str));
    console.log(string);