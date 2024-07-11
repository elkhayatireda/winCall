import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
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
        },
        phone: {
            type: String ,
            required: true,
            unique: true,
            default: ''
        },
        password: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Client = mongoose.model('Client', clientSchema);

export default Client;
