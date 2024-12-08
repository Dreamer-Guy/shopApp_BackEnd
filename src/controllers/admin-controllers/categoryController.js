import deleteImageFromDisk from "../../utils/deleteImageFromDisk.js";
import uploadImageToCloud from "../../utils/uploadImageToCloud.js";
import categoryService from "../../services/categoryService.js";
const OK_STATUS=200;
const BAD_REQUEST_STATUS=400;
const INTERNAL_SERVER_ERROR_STATUS=500;

const isMissDataToAdd=(req)=>{
    const {name, description}=req.body;
    return !name || !description;
}

const isMissDataToUpdate=(req)=>{
    const {name, description}=req.body;
    return !name || !description;
};

const addCategory = async (req, res) => {
    try{
        if(!isMissDataToAdd(req)){
            return res.status(BAD_REQUEST_STATUS)
            .send({message:"Please provide name and description"});
        };
        const {name, description} = req.body;
        if(await categoryService.isExistByName(name)){
            return res.status(BAD_REQUEST_STATUS).send({
                message:"Category name already exists"});
        }
        const TMP_DIR_PATH="./tmp";
        const filePath=TMP_DIR_PATH+"/"+req.file?.filename;
        const image=await uploadImageToCloud(filePath);
        deleteImageFromDisk(filePath);
        const category=await categoryService.create({name, description, image});
        await categoryService.save(category);
        return res.status(OK_STATUS).send({
                message:"Category created successfully",
                category,
            }
        );
    }   
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:'Internal server error'});
    }
    
};

const deleteCategory = async (req, res) => {
    try{
        const categoryId=req.params.id;
        const category=await categoryService.getCategoryById(categoryId);
        if(category){
            await categoryService.deleteByCategoryId(categoryId);
            return res.status(OK_STATUS).send({
                message:"Category deleted successfully"});
        }
        return res.status(BAD_REQUEST_STATUS).send({message:"Category not found"});
    }
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:e.message});
    }
};

const updateCategory = async (req, res) => {
    try{
        if(isMissDataToUpdate(req)){
            return res.status(BAD_REQUEST_STATUS)
            .send({message:"Please fullfill name and description fields"});
        };
        const categoryId=req.params.id;
        const {name, description} = req.body;
        const category=await categoryService.getCategoryById(categoryId);
        if(!category){
            return res.status(BAD_REQUEST_STATUS).send({message:"Category not found"});
        }
        const TMP_DIR_PATH="./tmp";
        const filePath=TMP_DIR_PATH+"/"+req.file?.filename;
        const image=req.file?await uploadImageToCloud(filePath):category.image;
        deleteImageFromDisk(filePath);
        category.name=name;
        category.description=description;
        category.image=image;
        const updatedCategory=await categoryService.updateCategory(categoryId,category);
        return res.status(OK_STATUS).send({
            message:"Category updated successfully",
            category:updatedCategory});
        
    }
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:e.message});
    }
};

const getAllCategories = async (req, res) => {
    try{
        const categories=await categoryService.getAllCategories();
        return res.status(OK_STATUS).send(categories);
    }
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:e.message});
    }
};

const getCategoryById = async (req, res) => {
    try{
        const categoryId=req.params.id;
        const category=await categoryService.getCategoryById(categoryId);
        if(category){
            return res.status(OK_STATUS).send(category);
        }
        return res.status(BAD_REQUEST_STATUS).send({message:"Category not found"});
    }
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:e.message});
    }
};

export {addCategory,updateCategory,deleteCategory,getAllCategories,getCategoryById};