import Category from "../models/Category.js";

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

};
export default categoryService;