import categoryTypicalService from "../../services/categoryTypicalService.js";
import categoryService from "../../services/categoryService.js";
import productDetailsService from "../../services/productDetailsService.js";
const OK_STATUS=200;
const BAD_REQUEST_STATUS=400;
const INTERNAL_SERVER_ERROR_STATUS=500

const isMissDataToAdd=(req)=>{
    const {name, description, category_id} = req.body;
    if(!name || !description || !category_id){
        return true;
    }
    return false;
}

const getAllTypicalDetails=async (req, res) => {
    try{
        const categoryId=req.params.id;
        const categoryTypicalDetails=await categoryTypicalService.getAllByCategoryId(categoryId);
        return res.status(OK_STATUS).send(categoryTypicalDetails);
    }
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:e.message});
    }
};

const addTypicalDetail = async (req, res) => {
    try{
        if(isMissDataToAdd(req)){
            return res.status(BAD_REQUEST_STATUS)
            .send({
                message:"Please provide name, description and category_id to add typical detail"});
        };
        const {name, description, category_id} = req.body;
        const category=await categoryService.getCategoryById(category_id);
        if(!category){
            return res.status(BAD_REQUEST_STATUS).send({message:"Category not found"});
        }
        if(await categoryTypicalService.isExistByName(name)){
            return res.status(BAD_REQUEST_STATUS).send({
                message:"Typical detail name already exists",
            });
        }
        const typicalDetail=await categoryTypicalService.create({name, description, category_id});
        await categoryTypicalService.save(typicalDetail);
        return res.status(OK_STATUS).send({
                message:"Typical detail created successfully",
                typicalDetail,
            }
        );
    }
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:'Internal server error'});
    }
};

const deleteTypicalDetail = async (req, res) => {
    try{
        const typicalDetailId=req.params.id;
        const typicalDetail=await categoryTypicalService.getById(typicalDetailId);
        if(!typicalDetail){
            return res.status(BAD_REQUEST_STATUS).send({message:"Typical detail not found"});
        }
        await categoryTypicalService.deleteById(typicalDetailId);
        await productDetailsService.deleteDetailsByPropertyId(typicalDetailId);
        return res.status(OK_STATUS).send({
            '_id':typicalDetailId,
            message:"Typical detail deleted successfully",
        });
        
    }
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:e.message});
    }
};

export {getAllTypicalDetails,addTypicalDetail,deleteTypicalDetail};