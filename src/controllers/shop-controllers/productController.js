import productService from "../../services/productService.js";


const SUCCESS_STATUS = process.env.SUCCESS_STATUS;
const BAD_REQUEST_STATUS = process.env.BAD_REQUEST_STATUS;
const SERVER_ERROR_STATUS = process.env.SERVER_ERROR_STATUS;
const ROW_PER_PAGE=8;



const formatSortParam=(req)=>{
    const sort=req.query.sort||"price-desc";
    const SORT_FIELD_INDEX=0;
    const SORT_ORDER_INDEX=1;
    const sortParam=sort.split('-');
    const sortField=sortParam[SORT_FIELD_INDEX];
    const sortOrder=sortParam[SORT_ORDER_INDEX]==='asc'?1:-1;
    return {sortField,sortOrder};
}

const formatFilterParam=(req)=>{
    const brandsEncoded=req.query.brand||"";
    const categoriesEncoded=req.query.category||"";
    const brands=brandsEncoded?decodeURIComponent(brandsEncoded).split(','):[].map((brand)=>brand.toLowerCase());
    const categories=categoriesEncoded?decodeURIComponent(categoriesEncoded).split(','):[].map((category)=>category.toLowerCase());
    return {brands,categories};    
}

const formatPriceParam=(req)=>{
    const DEFAULT_MIN_PRICE=0;
    const DEFAULT_MAX_PRICE=Number.MAX_VALUE;
    const priceRangQuery=req.query.priceRange||`${DEFAULT_MIN_PRICE}-${DEFAULT_MAX_PRICE}`;
    const priceRange=priceRangQuery.split(',')||[];
    const formatedPriceRange=priceRange.map(price=>{
        const [minPrice,maxPrice]=price.split('-');
        return {minPrice:Number(minPrice),maxPrice:Number(maxPrice)};
    });
    return formatedPriceRange;
};

const getQueryParams=(req)=>{
    const {page=1,rowPerPage=ROW_PER_PAGE}=req.query;
    const {brands,categories}=formatFilterParam(req);
    const {sortField,sortOrder}=formatSortParam(req);
    const priceRange=formatPriceParam(req);
    return {brands,categories,sortField,sortOrder,page:Number(page),rowPerPage:Number(rowPerPage),priceRange};
}

const populateProduct=(product)=>{
    return {
        ...product,
        brand:product.brand_id.name,
        category:product.category_id.name,
    }
};

const populateAggregatedProducts=(product)=>{
    delete product.category_id;
    delete product.brand_id;
    return {
        ...product,
        brand:product.brand.name,
        category:product.category.name,
    }
}


//controller

// const getAllFilteredProducts = async (req, res) => {
//     try {
//         const {
//             brands,categories,
//             sortField,sortOrder,
//             page=1,rowsPerPage=ROW_PER_PAGE,
//             minPrice,maxPrice}=getQueryParams(req);
//         const {onSales}=req.query;
//         let products = await productService.getProducts({ brands, categories, sortField, sortOrder,minPrice,maxPrice });
//         if(onSales==='true'){
//             products=products.filter((product)=>product.salePrice>0);
//         }
//         const totalProducts=products.length;
//         if(page && rowsPerPage){
//             products=products.slice((page-1)*rowsPerPage,page*rowsPerPage);
//         }
//         return res.status(SUCCESS_STATUS).send({
//             products:products.map(product=>populateProduct(product)),
//             totalProducts,
//         })
//     }
//     catch (e) {
//         return res.status(SERVER_ERROR_STATUS).send({
//             message:"server error",
//         });
//     }
// };

const searchProducts = async (req, res) => {
    try {
        const {brands,categories,
            sortField,sortOrder,
            page,rowsPerPage=ROW_PER_PAGE,
            priceRange=[]}=getQueryParams(req);
        const {onSales}=req.query;
        const {search}=req.query;
        let products=[];
        if(search && search.trim().length>0){
            products=await productService.getProductsBySearch(search,{brands, categories, sortField, sortOrder,priceRange });
        }
        else{
            products = await productService.getProducts({ brands, categories, sortField, sortOrder,priceRange });
        }
        if(onSales==='true'){
            products=products.filter((product)=>product.salePrice>0);
        }
        const totalProducts=products.length;
        if(page && rowsPerPage){
            products=products.slice((page-1)*rowsPerPage,page*rowsPerPage);
        }
        return res.send({
            totalProducts,
            products,
        });
    }
    catch (e) {
        return res.json({
            data: e.message,
        });
    }
};

const getRelatedProducts=async(req,res)=>{
    try{
        const {productId}=req.params;
        const products=await productService.getRelatedProductsByProductId(productId);
        return res.status(SUCCESS_STATUS).send({
            products:products.map(product=>populateAggregatedProducts(product)),
        });
    }
    catch(e){
        return res.status(SERVER_ERROR_STATUS).send({
            message:"server error",
        });
    }
}
export { searchProducts,getRelatedProducts};