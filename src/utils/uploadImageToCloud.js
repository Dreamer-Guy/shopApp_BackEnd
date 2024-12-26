import {storage} from "../config/firebase.js";
import {getDownloadURL, ref,uploadBytes} from "firebase/storage";
import { Blob} from "buffer";
import fs from "fs-extra"
import mime from "mime-types";
import path from "path";

const uploadImage=async(filePath)=>{
    try{
        const data=fs.readFileSync(filePath);
        const fileNameIncludeExt=path.basename(filePath);
        const imgRef=ref(storage,`/nmcnpm/${fileNameIncludeExt}`);
        const mimeType=mime.lookup(filePath);
        const blob=new Blob([data],{type:mimeType});
        const res=await uploadBytes(imgRef,blob);
        const downloadURL=await getDownloadURL(imgRef);
        return downloadURL;
    }
    catch(err){
        return '';
    }
}


export default uploadImage;