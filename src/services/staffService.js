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
        return await StaffProperties.findOne({staff_id:id}).lean()||{   
            salary:0,
            phone:"000-000-0000",
            address:"",
        };
    },
    updateStaffProperties:async(id,staffProperties)=>{
        const staff=await StaffProperties.findOneAndUpdate({staff_id:id},staffProperties,{new:true});
        return staff;
    },
    deleteStaffProperties:async(id)=>{
        await StaffProperties.findOneAndDelete({staff_id:id});
    },
};

export default staffService;