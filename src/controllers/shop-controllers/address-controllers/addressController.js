import addressService from "../../services/addressServices.js";

const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;

const getAllAddresses = async (req, res) => {
    try {
        const addresses = await addressService.getAddresses();
        
        return res.status(SUCCESS_STATUS).send({
            addresses
        })
    }
    catch (e) {
        return res.status(SERVER_ERROR_STATUS).send({
            message:"Server error",
        });
    }
};

const createAddress = async(req, res) => {
    try {
        const addressData = req.body;

        const existingAddress = await addressService.checkAddressExistence(addressData);
        if (existingAddress) {
            return res.status(BAD_REQUEST_STATUS).send({
                message: "Address already exists",
            });
        }

        const newAddress = await addressService.createAddress(addressData);

        await addressService.saveAddress(newAddress);

        return res.status(SUCCESS_STATUS).send({
            message: "Address created successfully",
        });
    } 
    catch (e) {
        return res.status(SERVER_ERROR_STATUS).send({
            message: "Server error",
        });
    }
};

const deleteAddress = async(req, res) => {
    try {
        const addressId = req.params.id;

        const deletedAddress = await addressService.deleteAddress(addressId);

        if (!deletedAddress) {
            return res.status(BAD_REQUEST_STATUS).send({
                message: "Address not found",
            });
        }

        if (addressToDelete.isDefault) {
            return res.status(BAD_REQUEST_STATUS).send({
                message: "Cannot delete the default address",
            });
        }

        return res.status(SUCCESS_STATUS).send({
            message: "Address deleted successfully",
        });
    } 
    catch (e) {
        return res.status(SERVER_ERROR_STATUS).send({
            message: "Server error",
        });
    }
};

const updateAddress = async(req, res) => {
    try {
        const addressId = req.params.id;
        const updateData = req.body;

        const updatedAddress = await addressService.updateAddress(addressId, updateData);

        if (!updatedAddress) {
            return res.status(BAD_REQUEST_STATUS).send({
                message: "Address not found",
            });
        }

        return res.status(SUCCESS_STATUS).send({
            message: "Address updated successfully",
        });
    } 
    catch (e) {
        return res.status(SERVER_ERROR_STATUS).send({
            message: "Server error",
        });
    }
};

const setDefaultAddress = async(req, res) => {
    try {
        const addressId = req.params.id;

        const updatedAddress = await addressService.setDefaultAddress(addressId);

        if (!updatedAddress) {
            return res.status(BAD_REQUEST_STATUS).send({
                message: "Address not found",
            });
        }

        await addressService.saveAddress(updateAddress);

        return res.status(SUCCESS_STATUS).send({
            message: "Address set as default successfully",
        });
    } 
    catch (e) {
        res.status(SERVER_ERROR_STATUS).send({
            message: "Server error",
        });
    }
};

export { getAllAddresses, createAddress, deleteAddress, updateAddress, setDefaultAddress};