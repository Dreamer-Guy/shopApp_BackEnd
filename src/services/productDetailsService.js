import { getProductDetailsByProductId } from "../controllers/shop-controllers/productDetail-controllers/productDetailsController.js";
import ProductProperties from "../models/ProductProperties.js";
import ProductPropertyValues from "../models/ProductPropertyValues.js";


const productDetailsService={
    deleteDetailsByPropertyId:async(property_id)=>{
        await ProductPropertyValues.deleteMany({property_id});
    }
    ,
    getProductDetailsByProductId:async(id)=>{
        const productDetails=await ProductPropertyValues.find({product_id:id}).populate('property_id').lean();
        return productDetails;
    },
    createProductPropertyValue:async(product_id,property_id,value)=>{
        const productPropertyValue=new ProductPropertyValues(product_id,property_id,value);
        return productPropertyValue;
    },

    create:async(productDetails)=>{
        const productPropertyValue=new ProductPropertyValues(productDetails);
        return productPropertyValue;
    },
    save:async(productPropertyValue)=>{
        const savedProductPropertyValue=await productPropertyValue.save();
        return savedProductPropertyValue;
    },
    saveProductDetailsForProduct:async(productDetails)=>{
        const savedProductDetails=await ProductPropertyValues.insertMany(productDetails);
        return savedProductDetails;
    },
    

    createProductPropertyOfCategory:async(category_id,name,description)=>{
        const productProperty=new ProductProperties(category_id,name,description);
        return productProperty;
    },

    saveProductPropertyOfCategory:async(productProperty)=>{
        const savedProductProperty=await productProperty.save();
        return savedProductProperty;
    },

    getPropertiesByCategory:async(category_id)=>{
        const properties=await ProductProperties
        .find({category_id})
        .lean();
        return properties;
    },
    getByProductId:async(id)=>{
        const productDeails=await ProductPropertyValues
        .find({product_id:id})
        .populate('property_id')
        .lean();
        return productDeails;
    },
    updateByProductId:async(id,details)=>{
        await ProductPropertyValues.deleteMany({product_id:id});
        const productDetails=details.map((detail)=>{
            return {
                product_id:id,
                property_id:detail.property_id,
                value:detail.value,
            };
        })
        await ProductPropertyValues.insertMany(productDetails);
        const updatedProductDetails=await ProductPropertyValues.find({product_id:id}).populate('property_id').lean();
        return updatedProductDetails;
    },
};

export default productDetailsService;