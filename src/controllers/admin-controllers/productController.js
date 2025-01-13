import productService from "../../services/productService.js";
import uploadImageToCloud from "../../utils/uploadImageToCloud.js";
import deleteImageFromDisk from "../../utils/deleteImageFromDisk.js";
import productDetailsService from "../../services/productDetailsService.js";
import brandService from "../../services/brandService.js";
import categoryService from "../../services/categoryService.js";

const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;

const TMP_DIR_PATH="./tmp";

const isMissEssentialData=(req)=>{
    const ESSENTIAL_DATA=["name","description","cost","price","salePrice","category_id","brand_id"];
    if(!req.body.product){
        return true;
    }
    const product=JSON.parse(req.body.product);
    for(const data of ESSENTIAL_DATA){
        if(!product[data]){
            return true;
        }
    }
    return false;
};

const populateProductDetail=(productDetail)=>{
    const populatedProductDetails={
        product_id:productDetail.product_id,
        property_id:productDetail.property_id._id,  
        name:productDetail.property_id.name,
        value:productDetail.value,
    };
    return populatedProductDetails;
};

const uploadImageAndDeleteFromDisk=async(file)=>{
    const filePath=TMP_DIR_PATH+"/"+file.filename;
    const image=await uploadImageToCloud(filePath);
    deleteImageFromDisk(filePath);
    return image;
};

const productController={
    getAllProducts:async(req,res)=>{
        try{
            const {page,limit,sort,filter={}}=req.query;
            const allProductDetails=await productService.getAllProductsForAdmin({page,limit,sort,filter});
            const totalProducts=await productService.countTotalProductsFilterForAdmin(filter);
            res
            .status(SUCCESS_STATUS)
            .send({
                totalProducts:totalProducts,
                products:allProductDetails,
            });
        }catch(err){
            res.status(SERVER_ERROR_STATUS)
                .send({message:err.message});
        }
    },
    
    getSoftDeletedProducts:async(req,res)=>{
        const {page,limit}=req.query;
        try{
            const allProductDetails=await productService.getSoftDeletedProducts(page,limit);
            const total=await productService.countSoftDeletedProducts();
            res
            .status(SUCCESS_STATUS)
            .send({
                message:"All products fetched successfully",
                products:allProductDetails,
                total,
            });
        }catch(err){
            res.status(SERVER_ERROR_STATUS)
                .send({message:err.message});
        }
    },
    
    getProductById:async(req,res)=>{
        const {id}=req.params;
        try{
            const product=await productService.getProductById(id);
            if(!product){
                res.status(BAD_REQUEST_STATUS)
                .send({message:"Product does not exist"});
                return;
            }
            res
            .status(SUCCESS_STATUS)
            .send(product);
        }catch(err){
            res.status(SERVER_ERROR_STATUS)
                .send({message:err.message});
        }
    },
    
    
    addProduct:async(req,res)=>{
        
        try{
            if(isMissEssentialData(req)){
                res.status(BAD_REQUEST_STATUS)
                .send({message:"Please provide essential data to add product"});
            };
            const product=JSON.parse(req.body.product);
            if(!await categoryService.isExistById(product.category_id)){
                res.status(BAD_REQUEST_STATUS)
                .send({message:"Category does not exist"});
                return;
            }
            if(!await brandService.isExistById(product.brand_id)){
                res.status(BAD_REQUEST_STATUS)
                .send({message:"Brand does not exist"});
            }
            const image=await uploadImageAndDeleteFromDisk(req.file);
            const productRes=await productService.create({...product,image});
            const savedProduct=await productService.save(productRes);
            const savedproductDetails=await productDetailsService.saveProductDetailsForProduct(product.productDetails.map((detail)=>({...detail,product_id:savedProduct._id})));
            res
            .status(SUCCESS_STATUS)
            .send(savedProduct);
        }catch(err){
            console.log(err.message);
            res.status(SERVER_ERROR_STATUS)
                .send({message:err.message});
        }
    },
    
    softDeleteProductById:async(req,res)=>{
        const {id}=req.params;
        try{
            if(!await productService.isProductExist(id)){
                res.status(BAD_REQUEST_STATUS)
                .send({message:"Product does not exist"});
                return;
            }
            await productService.softDeleteByProductId(id);
            res
            .status(SUCCESS_STATUS)
            .send({
                '_id':id,
                message:"Product deleted successfully",
            });
        }
        catch(err){
            res.status(SERVER_ERROR_STATUS)
                .send({message:err.message});
        }
    },
    
    restoreSoftDeletedProductById:async(req,res)=>{
        try{
            const {id}=req.params;
            await productService.restoreProductById(id);
            return res.status(SUCCESS_STATUS).send({
                message:"Product restored successfully",
                _id:id,});
        }
        catch(e){
            console.log(e.message);
            return res.status(SERVER_ERROR_STATUS).send({message:"There was an error while restoring the product"});
        }
    },
    
    deleteProductById:async(req,res)=>{
        const {id}=req.params;
        try{
            if(!await productService.isProductExist(id)){
                res.status(BAD_REQUEST_STATUS)
                .send({message:"Product does not exist"});
                return;
            }
            await productService.deleteByProductId(id);
            res
            .status(SUCCESS_STATUS)
            .send({
                '_id':id,
                message:"Product deleted successfully",
            });
        }catch(err){
            res.status(SERVER_ERROR_STATUS)
                .send({message:err.message});
        }
    },
    
    getNewImageUrl:async(req)=>{
        if(!req.file){
            const product=await productService.getProductById(req.params.id);
            return product.image;
        }
        const imageUrl=await uploadImageAndDeleteFromDisk(req.file);
        return imageUrl;
    },
    
    updateByProductId:async(req,res)=>{
        
        try{
            if(isMissEssentialData(req)){
                return res.status(BAD_REQUEST_STATUS)
                .send({message:"Please provide essential data to update product"});
            };
            if(!await categoryService.isExistById(req.body.product.category_id)){
                return res.status(BAD_REQUEST_STATUS)
                .send({message:"Category does not exist"});
            }
            if(!await brandService.isExistById(req.body.product.brand_id)){
                return res.status(BAD_REQUEST_STATUS)
                .send({message:"Brand does not exist"});
            }
            const {id}=req.params;
            const product=JSON.parse(req.body.product);
            if(!await productService.isProductExist(id)){
                return res.status(BAD_REQUEST_STATUS)
                .send({message:"Product does not exist"});
            }
            const image=await getNewImageUrl(req);
            const updatedProduct=await productService.updateByProductId(id,{...product,image});
            const updatedProductDetails=await productDetailsService.updateByProductId(id,product.productDetails);
            return res
            .status(SUCCESS_STATUS)
            .send({
                message:"Product updated successfully",
                product:updatedProduct,
                productDetails:updatedProductDetails.map((detail)=>populateProductDetail(detail)),
            });
        }catch(err){
            res.status(SERVER_ERROR_STATUS)
                .send({message:err.message});
        }
    },
    
    getTotalProducts:async(req,res)=>{
        try{
            const total=await productService.countTotalProducts();
            res
            .status(SUCCESS_STATUS)
            .send(String(total));
        }catch(err){
            res.status(SERVER_ERROR_STATUS)
                .send({message:err.message});
        }
    },

    getTopSalesProducts:async(req,res)=>{
        try{
            const {limit}=req.query;
            const topSales=await productService.getTopSalesProducts(limit);
            res
            .status(SUCCESS_STATUS)
            .send(topSales);
        }catch(err){
            res.status(SERVER_ERROR_STATUS)
                .send({message:err.message});
        }
    },

    getTotalSales:async(req,res)=>{
        try{
            const totalSales=await productService.getTotalSales();
            res
            .status(SUCCESS_STATUS)
            .send(String(totalSales));
        }catch(err){
            res.status(SERVER_ERROR_STATUS)
                .send({message:err.message});
        }
    },

};

export default productController;