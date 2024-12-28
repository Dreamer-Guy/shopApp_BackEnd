import uploadImageToCloud from "../utils/uploadImageToCloud.js";
import deleteImageFromDiskSync from "../utils/deleteImageFromDisk.js";
const TMP_DIR_PATH="./tmp";

const uploadImageController = async (req, res) => {
    try {
        const filePath=TMP_DIR_PATH+"/"+req.file.filename;
        const image=await uploadImageToCloud(filePath);
        deleteImageFromDiskSync(filePath);
        res.status(200).send({
            url:image,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export default uploadImageController;