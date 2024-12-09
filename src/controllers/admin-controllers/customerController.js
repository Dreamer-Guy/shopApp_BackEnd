import userService from "../../services/userService.js";

const OK_STATUS=200;
const BAD_REQUEST=400;
const INTERNAL_SERVER_ERROR=500;

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
        return res.status(OK_STATUS).json(customers);
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
        return res.status(OK_STATUS).json({message:"User has been banned"});
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
        return res.status(OK_STATUS).json({message:"User has been unbanned"});
    }
    catch(e){
        console.log(e);
        return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal server error"});
    }
};


export {getAllCustomers,banAccount,unbanAccount};