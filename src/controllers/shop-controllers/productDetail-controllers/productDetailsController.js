import productDetailsService from "../../../services/productDetailsService.js";


const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;


const populateProductDetail=(propertyValues={})=>{
    const populatedProductDetails={
        ...propertyValues,
        name:propertyValues.property_id.name,
    };
    delete populatedProductDetails.property_id;
    return populatedProductDetails;
}

const getProductDetailsByProductId=async(req,res)=>{
    const {id}=req.params;
    try{
        
        const productDetails=await productDetailsService.getProductDetailsByProductId(id)
        const populatedProductDetails=productDetails.map((value)=>populateProductDetail(value));
        res
        .status(SUCCESS_STATUS)
        .send(populatedProductDetails);
    }catch(err){
        res.status(SERVER_ERROR_STATUS)
            .send({message:err.message});
    }
};

export {getProductDetailsByProductId};