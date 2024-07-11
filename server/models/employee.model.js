import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        phone: {
            type: String ,
            required: true,
            unique: true,
            default: ''
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
