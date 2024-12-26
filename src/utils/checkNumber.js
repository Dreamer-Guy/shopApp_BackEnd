const checkNumber={
    isInteger:(value)=>{
        const regex = /^(-?|\+?)\d+$/; 
        return regex.test(value);
    },
    isPositiveInteger:(value)=>{
        const regex = /^\+?\d+$/; 
        return regex.test(value);
    },
};

export default checkNumber;