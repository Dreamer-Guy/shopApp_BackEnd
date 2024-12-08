import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    name: {type: String, required: true},
    price: {type: Number, required: true},
    salePrice:{
        type:Number,
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    totalStock:{type: Number,required:true},
    image:String,
    rating:{
        type:Number,
        default:0,
    },
    numReviews:{
        type:Number,
        default:0,
    },
    description: {type: String,default:"No description"},
    status:{type:String,default:"On stock"},
    createdAt:{type:Date,default:Date.now},
});

//exptected receit an arr
productSchema.query.byCategory = function(categories) {
    if (!categories || categories.length <= 0){
        return this.populate('category_id');
    }
    return this.populate({
        path: 'category_id',
        match:{
            name:{$in:categories}
        }
    });
};

productSchema.query.byBrand = function(brands) {
    if (!brands || brands.length <= 0){
        return this.populate('brand_id');
    }
    return this.populate({
        path: 'brand_id',
        match:{
            name:{$in:brands}
        }
    });
};

productSchema.query.byPrice=function(priceRange=[]){
    if (priceRange.length===0) return this; 
    const priceConditions=priceRange.map(({minPrice,maxPrice})=>({
        price:{$gte:minPrice,$lte:maxPrice}
    }));
    return this.where({$or:priceConditions});
}

productSchema.index({name:'text',description:'text'});

const Product=mongoose.model('Product',productSchema);

export default Product;