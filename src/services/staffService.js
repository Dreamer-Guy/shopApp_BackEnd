import StaffProperties from "../models/StaffProperties.js";

const staffService = {
    createStaffProperties: async (staff_id, staffProperties) => {
        const staffPropertiesData = {
            staff_id,
            salary:Number(staffProperties.salary),
            ...staffProperties
        };
        const staffPropertiesInstance =new StaffProperties(staffPropertiesData);
        return staffPropertiesInstance;
    },
    saveStaffProperties:async(staffProperties)=>{
        await staffProperties.save();
        return staffProperties;
    },
    getStaffProperties:async(id)=>{
        return await StaffProperties.findOne({staff_id:id}).lean();
    }
};

export default staffService;