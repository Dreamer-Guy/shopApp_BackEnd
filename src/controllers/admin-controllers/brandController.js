import deleteImageFromDisk from "../../utils/deleteImageFromDisk.js";
import uploadImageToCloud from "../../utils/uploadImageToCloud.js";
import brandService from "../../services/brandService.js";
const OK_STATUS=200;
const BAD_REQUEST_STATUS=400;
const INTERNAL_SERVER_ERROR_STATUS=500;

const isMissDataToAddBrand=(req)=>{
    const {name, description}=req.body;
    return !name || !description;
}

const isMissDataToUpdateBrand=(req)=>{
    const {name, description}=req.body;
    return !name || !description;
};

const getAllBrands = async (req, res) => {
    try{
        const brands=await brandService.getAllBrands();
        return res.status(OK_STATUS).send(brands);
    }
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:'Internal server error'});
    }
};

const addBrand = async (req, res) => {
    try{
        if(isMissDataToAddBrand(req)){
            return res.status(BAD_REQUEST_STATUS)
            .send({message:"Missing data"});
        };
        const {name, description} = req.body;
        if(await brandService.isExistByName(name)){
            return res.status(BAD_REQUEST_STATUS).send({
                message:"Brand name already exists"});
        }
        const TMP_DIR_PATH="./tmp";
        const filePath=TMP_DIR_PATH+"/"+req.file?.filename;
        const image=await uploadImageToCloud(filePath);
        deleteImageFromDisk(filePath);
        const brand=await brandService.create({name, description, image});
        await brandService.save(brand);
        return res.status(OK_STATUS).send({
                message:"Brand created successfully",
                brand,
            }
        );
    }   
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:'Internal server error'});

    }
    
};

const deleteBrand = async (req, res) => {
    try{
        const brandId=req.params.id;
        const brand=await brandService.getBrandById(brandId);
        if(brand){
            await brandService.deleteByBrandId(brandId);
            return res.status(OK_STATUS).send({message:"Brand deleted successfully"});
        }
        return res.status(BAD_REQUEST_STATUS).send({message:"Brand not found"});
    }
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:e.message});
    }
    
};

const updateBrand = async (req, res) => {
    try{
        if(isMissDataToUpdateBrand(req)){
            return res.status(BAD_REQUEST_STATUS)
            .send({message:"Please fullfill name and description fields"});
        };
        const brandId=req.params.id;
        const brand=await brandService.getBrandById(brandId);
        if(!brand){
            return res.status(BAD_REQUEST_STATUS).send({message:"Brand not found"});
        }
        const {name, description} = req.body;
        const TMP_DIR_PATH="./tmp";
        const filePath=TMP_DIR_PATH+"/"+req.file?.filename;
        const image=req.file?await uploadImageToCloud(filePath):brand.image;
        deleteImageFromDisk(filePath);
        brand.name=name;
        brand.description=description;
        brand.image=image;
        await brandService.updateBrand(brandId, brand);
        return res.status(OK_STATUS).send({
                message:"Brand updated successfully",
                brand,
            }
        );
    }
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:e.message});
    }
    
};


export {getAllBrands,addBrand,updateBrand,deleteBrand};