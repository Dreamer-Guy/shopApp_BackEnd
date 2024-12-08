import express from "express";
import { 
    getAllAddresses, 
    createAddress, 
    deleteAddress, 
    updateAddress, 
    setDefaultAddress 
} from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.get("/", getAllAddresses);
addressRouter.post("/", createAddress);
addressRouter.put("/:id", updateAddress);
addressRouter.delete("/:id", deleteAddress);
addressRouter.patch("/:id/default", setDefaultAddress);

export default addressRouter;