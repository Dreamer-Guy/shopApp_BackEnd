import mongoose from "mongoose";
import Product from "../models/Product.js";
import brandService from "./brandService.js";
import categoryService from "./categoryService.js";


const productService = {
    getAllProducts:async()=>{
        const products=await Product.find({isDeleted:false}).lean();
        return products;
    },
    getAllProductsForAdmin:async({page,limit,sort,filter})=>{
        const sortKey=Object.keys(sort)[0];
        const sortValue=Number(Object.values(sort)[0]);
        const formatedSort={
            [sortKey]:sortValue
        };
        const products=await Product
        .find({...filter,isDeleted:false})
        .sort(formatedSort)
        .skip((page-1)*limit)
        .limit(limit)
        .populate('brand_id')
        .populate('category_id')
        .lean();
        return products;
    },
    countTotalProductsFilterForAdmin:async(filter)=>{
        const count=await Product.countDocuments({...filter,isDeleted:false});
        return count;
    },
    getSoftDeletedProducts:async(page,limit)=>{
        const products=await Product.find({isDeleted:true}).skip((page-1)*limit).limit(limit).lean();
        return products;
    },

    countSoftDeletedProducts:async()=>{
        const count=await Product.countDocuments({isDeleted:true});
        return count;
    },

    create: async (productProps) => {
        const productRes =await Product.create(productProps);
        return productRes;
    },
    save: async (product) => {
        const savedProduct=await product.save();
        return savedProduct;
    },
    isProductExist: async (productId) => {
        const product = await Product.findById(productId);
        return product !== null;
    },
    getProducts: async ({ brands, categories, sortField='price', sortOrder=1,minPrice=0,priceRange }) => {
        const products = await Product.find({isDeleted:false})
            .byCategory(categories)
            .byBrand(brands)
            .byPrice(priceRange)
            .sort({ [sortField]: sortOrder })
            .lean();
        const t=products.filter(product=>product.category_id&&product.brand_id);
        return products.filter(product=>product.category_id&&product.brand_id);
    },
    
    getProductById: async (productId) => {
        const product = await Product
        .findById(productId)
        .populate('brand_id')
        .populate('category_id').lean();
        return product;
    },

    updateByProductId: async (productId, productProps) => {
        const product = await Product.findByIdAndUpdate(productId, 
            {...productProps,cost:Number(productProps.cost)}, { new: true });
        return product;
    },
    softDeleteByProductId: async (productId) => {
        const product = await Product.findById(productId);
        if(!product){
            return;
        }
        product.isDeleted = true;
        await product.save();
    },
    deleteByProductId: async (productId) => {
        await Product.findByIdAndDelete(productId);
    },
    restoreProductById: async (productId) => {
        const product = await Product.findById(productId);
        product.isDeleted = false;
        await product.save();
    },
    getRelatedProductsByProductId: async (productId) => {
        const product = await Product.findById(productId)
            .populate('brand_id')  
            .populate('category_id')  
            .lean();
        
        const products = await Product.aggregate([
            {
                $lookup: {
                    from: 'categories',  
                    localField: 'category_id',  
                    foreignField: '_id',  
                    as: 'category'  
                }
            },
            {
                $lookup: {
                    from: 'brands',  
                    localField: 'brand_id',  
                    foreignField: '_id',  
                    as: 'brand'  
                }
            },
            {
                $match: {
                    $and: [
                        {
                            $or: [
                                {
                                    'category.name': {
                                        $regex: new RegExp(`^${product.category_id.name}$`, 'i')  
                                    }
                                },
                                {
                                    'brand.name': {
                                        $regex: new RegExp(`^${product.brand_id.name}$`, 'i')  
                                    }
                                }
                            ]
                        },
                        {
                            _id: { $ne: new mongoose.Types.ObjectId(productId) }  
                        },
                        {
                            isDeleted:false,
                        }
                    ]
                }
            }
        ]);
        
        return products;
    },
    
    getProductsBySearch: async (searchTerm,
        { brands=[], categories=[], sortField='price', sortOrder=1,priceRange }) => {
            const priceConditions=priceRange.map(({minPrice,maxPrice})=>{
                return {
                    price: { $gte: minPrice, $lte: maxPrice }
                }
            });
            const products = await Product.aggregate([
                {
                    $lookup:{
                        from:'brands',
                        localField:'brand_id',
                        foreignField:'_id',
                        as:'brand'
                    }
                },
                {$unwind:'$brand'},
                {
                    $lookup:{
                        from:'categories',
                        localField:'category_id',
                        foreignField:'_id',
                        as:'category'
                    }
                },
                {$unwind:'$category'},
                {
                    $match:{
                        $and: [
                            {
                                $or:[
                                    { 'category.name': { $regex: searchTerm, $options: 'i' } },
                                    { 'brand.name': { $regex: searchTerm, $options: 'i' } },
                                    { name: { $regex: searchTerm, $options: 'i' } },
                                    { description:{ $regex: searchTerm, $options: 'i' }}
                                ]
                            },
                            categories.length > 0 ? { 'category.name': { $in: categories.map(c => new RegExp(c, 'i')) } } : {},
                            brands.length > 0 ? { 'brand.name': { $in: brands.map(b => new RegExp(b, 'i')) } } : {},
                            {
                                $or: priceConditions
                            },
                            {
                                isDeleted:false,
                            }
                        ]
                    }
                },
                {
                    $sort: { [sortField]: parseInt(sortOrder) }
                }
            ]);
        return products;
    },

    getTopProducts: async (top) => {
        const products = await Product.find({isDeleted:false}).sort({ rating: -1 }).limit(top);
        return products;
    },
    updateByProductRating: async (productId, rating) => {
        const product = await Product.findById(productId);
        product.rating = (product.rating * product.numReviews + Number(rating)) / (product.numReviews + 1);
        product.numReviews += 1;
        await product.save();
    },
    countTotalProducts: async () => {
        const count = await Product.countDocuments({isDeleted:false});
        return count;
    },
    getTotalSales: async () => {
        const totalSales = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$totalSales' }
                }
            }
        ]);
        return totalSales[0].totalSales;
    },
    getTopSalesProducts: async (limit) => {
        const products = await Product
        .find({isDeleted:false})
        .sort({ totalSales: -1 }).limit(Number(limit));
        return products;
    },
    getLatestProducts: async (limit) => {
        try {
            const products = await Product.find({ isDeleted: false })
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate('brand_id')
                .populate('category_id');
            return products;
        } catch (error) {
            throw error;
        }
    },

    updateProductAfterDeletingReview: async ({productId,rating}) => {
        const product = await Product.findById(productId);
        product.rating = (product.rating * product.numReviews - Number(rating)) / (product.numReviews - 1);
        product.numReviews -= 1;
        await product.save();
    },

    updateAfterDeletingBrand: async (brandId) => {
        const defaultBrand = await brandService.getDefaultBrand();
        await Product.updateMany({ brand_id: brandId }, { brand_id: defaultBrand._id });
    },

    updateAfterDeletingCategory: async (categoryId) => {
        const defaultCategory = await categoryService.getDefaultCategory();
        await Product.updateMany({ category_id: categoryId }, { category_id: defaultCategory._id });
    },
};


export default productService;