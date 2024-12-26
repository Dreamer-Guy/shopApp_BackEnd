import fs from 'fs-extra';
const deleteImageFromDiskSync =(filePath) => {
    if(!fs.existsSync(filePath)){
        return;
    } 
    fs.unlinkSync(filePath, (err) => {
        if (err) {
            console.error(`Error deleting the file at ${filePath}:`, err);
            return;
        }
        console.log(`File at ${filePath} deleted successfully!`);
    });
};

export default deleteImageFromDiskSync;