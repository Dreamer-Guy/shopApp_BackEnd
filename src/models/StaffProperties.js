import mongoose from "mongoose";

const StaffPropertiesSchema = new mongoose.Schema({
    staff_id:{ type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    salary:{ type: Number,
        default: 0,
    },
    phone:{ type: String,
        default:"000-000-0000",
    },
    address:{ type: String,
        default:"",
    },
});
const StaffProperties= mongoose.model("StaffProperties", StaffPropertiesSchema);
export default StaffProperties;