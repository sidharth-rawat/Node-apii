
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _organizationSchema = new Schema({
        name: {
            type: String,
            required: true, 
            trim: true, 
        },
        address: {
            type: Object,
            line1: {
                type: String,
                required: true,
            },
            pincode: {
                type: Number,
                required: true,
            },
            state: {
                type: String,
                required: true
            },
            required: true,
        },
        phone: {
            type: Number,
            required: [true, 'Phone number is mandatory'],
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        isDeleted: {
            type: Boolean, 
            default: false,
        }
    }, 

    {
        versionKey: false,
        timestamps: true
    }
);


module.exports = mongoose.model('Organization', _organizationSchema);

