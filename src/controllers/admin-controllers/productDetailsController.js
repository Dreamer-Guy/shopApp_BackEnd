import productDetailsService from "../../services/productDetailsService.js";
import productService from "../../services/productService.js";


const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;

const populateProductDetail=(productDetail)=>{
    const populatedProductDetails={
        product_id:productDetail.product_id,
        property_id:productDetail.property_id._id,  
        name:productDetail.property_id.name,
        value:productDetail.value,
    };
    return populatedProductDetails;
};

const getProductDetailsByProductId=async(req,res)=>{
    const {id}=req.params;
    try{
        const productDetails=await productDetailsService.getByProductId(id);
        res
        .status(SUCCESS_STATUS)
        .send(productDetails.map(productDetail=>populateProductDetail(productDetail)));
    }catch(err){
        res.status(SERVER_ERROR_STATUS)
            .send({message:err.message});
    }
};

const deleteProductDetailsByProductId=async(req,res)=>{
    const {id}=req.params;
    try{
        await productDetailsService.deleteByProductId(id);
        res
        .status(SUCCESS_STATUS)
        .send({
            '_id':id,
            message:"Product Details deleted successfully",
        });
    }catch(err){
        res.status(SERVER_ERROR_STATUS)
            .send({message:err.message});
    }
};

const updateProductDetailsByProductId=async(req,res)=>{
    const {id}=req.params;
    const {details}=req.body;
    try{
        if(!await productService.isProductExist(id)){
            res.status(BAD_REQUEST_STATUS)
            .send({message:"Product does not exist"});
            return;
        }
        if(productDetailsValidator.isInvalidType(details)){
            res.status(BAD_REQUEST_STATUS)
            .send({message:"Invalid product type"});
            return;
        };
        if(productDetailsValidator.isMissingProps(details)){
            res.status(BAD_REQUEST_STATUS)
            .send({message:"Missing necessary properties"});
            return;
        };
        await productDetailsService.updateByProductId(id,details);
        res
        .status(SUCCESS_STATUS)
        .send({
            message:"Product Details updated successfully",
        });
    }catch(err){
        res.status(SERVER_ERROR_STATUS)
            .send({message:err.message});
    }
};

const addProductDetails=async(req,res)=>{
    const {productId}=req.params;
    const {details}=req.body;
    try{
        if(!await productService.isProductExist(id)){
            res.status(BAD_REQUEST_STATUS)
            .send({message:"Product does not exist"});
            return;
        }
        if(productDetailsValidator.isInvalidType(details)){
            res.status(BAD_REQUEST_STATUS)
            .send({message:"Invalid product type"});
            return;
        };
        if(productDetailsValidator.isMissingProps(details)){
            res.status(BAD_REQUEST_STATUS)
            .send({message:"Missing necessary properties"});
            return;
        };
        const productDetails=await productDetailsService.create({...details,productId});
        await productDetailsService.save(productDetails);
        res
        .status(SUCCESS_STATUS)
        .send({
            message:"Product Details added successfully",
        });
    }catch(err){
        res.status(SERVER_ERROR_STATUS)
            .send({message:err.message});
    }
};

export {getProductDetailsByProductId,addProductDetails,updateProductDetailsByProductId,
deleteProductDetailsByProductId};