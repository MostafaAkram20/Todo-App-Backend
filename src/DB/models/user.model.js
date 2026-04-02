import mongoose from "mongoose";
import validator from 'validator';
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isAlphanumeric, 'Username must contain only letters and numbers'],
        minLength: [8, 'user must be at least 8 characters'],
        maxLength: [30, 'user maximum length is 30 characters'],
        trim: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isStrongPassword(value, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 0,
                    minNumbers: 1,
                    minSymbols: 0
                });
            },
            message: 'Password is too weak'
        }
    },
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'user must be at least 3 characters'],
        maxLength: [15, 'user maximum length is 15 characters']
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, 'user must be at least 3 characters'],
        maxLength: [15, 'user maximum length is 15 characters']
    },
    dateOfBirth: {
        type: Date,
        default: null,
    }

}, { timestamps: true });



const userModel = mongoose.models.User || mongoose.model('User', userSchema)

export default userModel