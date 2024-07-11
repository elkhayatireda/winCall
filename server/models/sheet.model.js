import mongoose from "mongoose";

const sheetSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Client'
    },
    Employee_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Employee'
    },
    sheetUrl: {
        type: String,
        required: true,
    },
    sheetId: {
        type: String,
        required: true
    },
    newOrder: { 
        type: Boolean, 
        default: false 
    },
    lastorderDate: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
});

const Sheet = mongoose.model('Sheet', sheetSchema);

export default Sheet;
