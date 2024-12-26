import mongoose from "mongoose";
import ProductProperties from "../models/ProductProperties.js";


const categoryTypicalService = {
    async create(data){
        return new ProductProperties(data);
    },
    async save(category){
        return category.save();
    },
    async getAllByCategoryId(id){
        return ProductProperties.find({category_id:new mongoose.Types.ObjectId(id)}).lean();
    },
    async getById(id){
        return ProductProperties.findById(id);
    },
    async deleteById(id){
        return ProductProperties.findByIdAndDelete(id);
    },
    async updateById(id, data){
        return ProductProperties.findByIdAndUpdate(id, data, {new:true});
    },
    async isExistByName(name){
        return ProductProperties.findOne({name});
    },
    async isExistById(id){
        return ProductProperties.findById(id);
    },
};

export default categoryTypicalService;