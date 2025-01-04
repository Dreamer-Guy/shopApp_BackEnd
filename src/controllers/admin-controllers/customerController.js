import userService from "../../services/userService.js";

const OK_STATUS=200;
const BAD_REQUEST=400;
const INTERNAL_SERVER_ERROR=500;

const formatDate=(date)=>{
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};

const getFormattedQuery=(query)=>{
    const {page,limit,sort}=query;
    for(const key in sort){
        sort[key]=parseInt(sort[key]);
    }
    return {page,limit,sort};
};

const getAllCustomers=async(req,res)=>{
    try{
        const {page,limit,sort}=getFormattedQuery(req.query);
        const customers=await userService.getAllCustomers(page,limit,sort);
        const totalCustomers=await userService.countCustomers();
        return res.status(OK_STATUS).send({
            customers:customers.map(customer=>({
                ...customer._doc,
                createdAt:formatDate(customer.createdAt),
            })),
            totalCustomers,
        });
    }
    catch(e){
        console.log(e);
        return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal server error"});
    }
};

const banAccount=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!await userService.getUserByID(id)){
            return res.status(BAD_REQUEST).json({message:"User not found"});
        }
        await userService.banAccount(id);
        return res.status(OK_STATUS).send(id);
    }
    catch(e){
        console.log(e);
        return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal server error"});
    }
};

const unbanAccount=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!await userService.getUserByID(id)){
            return res.status(BAD_REQUEST).json({message:"User not found"});
        }
        await userService.unbanAccount(id);
        return res.status(OK_STATUS).send(id);
    }
    catch(e){
        console.log(e);
        return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal server error"});
    }
};


export {getAllCustomers,banAccount,unbanAccount};