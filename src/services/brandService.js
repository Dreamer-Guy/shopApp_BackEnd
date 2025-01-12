import Brand from "../models/Brand.js";

const DEFAULT_BRAND_NAME='default';

const brandService={
    isExistByName:async(name)=>{
        return await Brand.exists({name});
    },
    create: async(data)=>{
        const newBrand=new Brand(data);
        return newBrand;
    },
    save:async(brand)=>{
        return await brand.save();
    },
    getBrandById:async(id)=>{
        return await Brand.findById(id);
    },
    deleteByBrandId:async(id)=>{
        return await Brand.findByIdAndDelete(id);
    },
    updateBrand:async(id, data)=>{
        return await Brand.findByIdAndUpdate(id, data, {new:true});
    },
    getAllBrands:async()=>{
        return await Brand.find().lean();
    },
    isExistById:async(id)=>{
        return await Brand.exists({_id:id});
    },
    getDefaultBrand:async()=>{
        const brand=await Brand.findOne({name:DEFAULT_BRAND_NAME}).lean();
        return brand;
    },
};

export default brandService;