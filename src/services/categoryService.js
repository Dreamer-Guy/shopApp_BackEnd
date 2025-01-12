import Category from "../models/Category.js";

const DEFAULT_CATEGORY_NAME='default';

const categoryService={
    isExistByName:async(name)=>{
        return await Category.exists({name});
    },
    create: async(data)=>{
        const newCategory=new Category(data);
        return newCategory;
    },
    save:async(category)=>{
        return await category.save();
    },
    getAllCategories:async()=>{
        return await Category.find().lean();
    },
    getCategoryById:async(id)=>{
        return await Category.findById(id).lean();
    },
    deleteByCategoryId:async(id)=>{
        return await Category.findByIdAndDelete(id);
    },
    updateCategory:async(id, data)=>{
        return await Category.findByIdAndUpdate(id, data, {new:true});
    },
    isExistById:async(id)=>{
        return await Category.exists({_id:id});
    },
    getDefaultCategory:async()=>{
        const category=await Category.findOne({name:DEFAULT_CATEGORY_NAME}).lean();
        return category;
    },

};
export default categoryService;