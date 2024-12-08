import Address from "../models/Address.js";

const addressService = {

    async createAddress(addressData){
        const address = new Address(addressData);
        return address;
    },

    async saveAddress(address){
        await address.save();
        return address;
    },

    async getAddresses(){
        const addresses = await Address.find();
        return addresses;
    },

    async getAddressById(addressId){
        const address = await Address.findById(addressId);
        return address;
    },

    async updateAddress(addressId, updateData){
        const address = await Address.findByIdAndUpdate(addressId, updateData, { new: true });
        return address;
    },

    async deleteAddress(addressId) {
        const address = await Address.findByIdAndDelete(addressId);
        return address;
    },

    async setDefaultAddress(addressId) {
        const address = await Address.findById(addressId);

        await Address.updateMany(
            { isDefault: true },
            { isDefault: false }
        );

        address.isDefault = true;

        return address;
    },

    async checkAddressExistence(addressData) {
        const address = await Address.findOne({
            address: addressData.address,
            city: addressData.city,
            postalCode: addressData.postalCode,
            phone: addressData.phone,
        });

        return address;
    },

};

export default addressService;
